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
        if "artist_id" not in req:
            response["status"] = 400
            response["error"] = "Malformed request, no artist_id"
            return response, 400

        artist_id = req["artist_id"]

        album_ids = []
        # get each album the artist appears on, in batches of 20
        current_result = toptracks.sp.artist_albums(artist_id)
        while current_result:
            album_ids.append([album["id"] for album in current_result["items"]])
            current_result = toptracks.sp.next(current_result)

        # get the track list for each album
        track_ids = []
        for id_group in album_ids:
            # get the information for up to 20 albums at once
            albums = toptracks.sp.albums(id_group)["albums"]
            for album in albums:
                for track in album["tracks"]["items"]:
                    # check each track to see if our artist is actually on it
                    # useful for collaborations and compilations
                    if artist_id in [artist["id"] for artist in track["artists"]]:
                        track_ids.append(track["id"])

        track_info = []
        # split our list of track IDs into lists of size 50, our max limit for a Spotify API req
        track_id_groups = [track_ids[i : i + 50] for i in range(0, len(track_ids), 50)]
        for id_group in track_id_groups:
            # download the name, popularity, and more for each of the artist's songs
            tracks_resp = toptracks.sp.tracks(id_group)
            track_info.extend(tracks_resp["tracks"])

        # sort our list of tracks' info by the popularity ranking
        sorted_tracks = sorted(track_info, key=lambda k: k["popularity"], reverse=True)

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