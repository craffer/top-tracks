"""API endpoints for getting an artist's top tracks."""
import flask
import toptracks
import spotipy


@toptracks.app.route("/api/v1/tracks", methods=["GET", "POST"])
def get_tracks():
    """Given an artist's Spotify ID, return their 100 most popular tracks in order."""
    response = {}

    if flask.request.method == "POST":
        # retrieve the artist ID from the post request
        req = flask.request.get_json()
        if "artist_id" not in req or "artist_name" not in req:
            response["status"] = 400
            response["error"] = "Malformed request"
            return response, 400

        artist_name = req["artist_name"]
        artist_id = req["artist_id"]
        tracks = []
        current_result = toptracks.sp.search(
            f"artist:{artist_name}", type="track", limit=50
        )
        if current_result:
            tracks.extend(current_result["tracks"]["items"])
            current_result = toptracks.sp.next(current_result["tracks"])
            if current_result:
                tracks.extend(current_result["tracks"]["items"])

        # sort our list of tracks' info by the popularity ranking
        sorted_tracks = sorted(tracks, key=lambda k: k["popularity"], reverse=True)

        # we want to return a dictionary with one key, tracks, with a list of track info
        response["tracks"] = []
        for track in sorted_tracks[:100]:
            track_resp = {}

            track_resp["album"] = {}
            track_resp["album"]["external_url"] = track["album"]["external_urls"][
                "spotify"
            ]
            track_resp["album"]["spotify_id"] = track["album"]["id"]
            track_resp["album"]["images"] = track["album"]["images"]
            track_resp["album"]["name"] = track["album"]["name"]

            track_resp["artists"] = []
            for artist in track["artists"]:
                artist_info = {}
                artist_info["external_url"] = artist["external_urls"]["spotify"]
                artist_info["spotify_id"] = artist["id"]
                artist_info["name"] = artist["name"]
                track_resp["artists"].append(artist_info)

            track_resp["external_url"] = track["external_urls"]["spotify"]
            track_resp["spotify_id"] = track["id"]
            track_resp["name"] = track["name"]
            track_resp["popularity"] = track["popularity"]

            response["tracks"].append(track_resp)

    return flask.jsonify(**response)
