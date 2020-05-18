"""API endpoints for searching for an artist."""
import flask
import toptracks
import spotipy


@toptracks.app.route("/api/v1/search")
def search(search_term=""):
    """Query Spotify for an artist."""
    context = {}
    user_query = f'"{search_term}"' if search_term else flask.request.args.get("q")
    if not user_query:
        return flask.jsonify(**context), 404

    resp = toptracks.sp.search(user_query, type="artist")

    context["artists"] = []
    for artist in resp["artists"]["items"]:
        info = {}
        info["external_url"] = artist["external_urls"]["spotify"]
        info["spotify_id"] = artist["id"]
        info["images"] = artist["images"]
        info["name"] = artist["name"]
        info["popularity"] = artist["popularity"]

        context["artists"].append(info)

    # sort our artist dictionary by popularity before returning
    context["artists"] = sorted(
        context["artists"], key=lambda k: k["popularity"], reverse=True
    )

    return flask.jsonify(**context)
