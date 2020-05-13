"""Display the main view."""
import flask
import toptracks


@toptracks.app.route("/about")
def show_about():
    """Display /about route."""
    return flask.render_template("about.html")
