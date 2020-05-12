"""Package initializer for toptrack's Flask backend."""
import flask
import os

# app is a single object used by all the code modules in this package
app = flask.Flask(__name__)  # pylint: disable=invalid-name

# Read settings from config module (toptracks/config.py)
app.config.from_object("toptracks.config")

# Overlay settings read from file specified by environment variable. This is
# useful for using different on development and production machines.
# Reference: http://flask.pocoo.org/docs/0.12/config/
app.config.from_envvar("FLASK_SETTINGS", silent=True)

# tell our app about our API and views files
import toptracks.api  # noqa: E402  pylint: disable=wrong-import-position
import toptracks.views  # noqa: E402  pylint: disable=wrong-import-position
