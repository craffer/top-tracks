"""Display the main view."""
import flask
import toptracks


@toptracks.app.route("/")
def show_index():
    """Display / route."""
    return flask.render_template("index.html")
