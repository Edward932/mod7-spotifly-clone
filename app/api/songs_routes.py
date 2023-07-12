from flask import Blueprint
from flask_login import login_required
from app.models import Song

songs_routes = Blueprint('songs', __name__)

@songs_routes.route('/<int:songId>')
# @login_required
def song(songId):
    """
    Query for one song and return a dict
    """
    song = Song.query.get(songId)
    return song.to_dict()
