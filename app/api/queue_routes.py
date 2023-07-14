from flask import Blueprint
from flask_login import login_required, current_user
from app.models import db, Queue

queue_routes = Blueprint('queue', __name__)


@queue_routes.route("/current/<songId>", methods=["POST"])
@login_required
def set_current_song(songId):
    queue = Queue.query.filter(Queue.user_id == current_user.id).one_or_none()
    queue.curr_song = songId
    db.session.commit()

    return songId

@queue_routes.route("")
@login_required
def load_que():
    queue = Queue.query.filter(Queue.user_id == current_user.id).one()
    return queue.to_dict()

@queue_routes.route("/<int:songId>", methods=["POST"])
@login_required
def add_song_next(songId):
    queue = Queue.query.filter(Queue.user_id == current_user.id).one()
    old_next_songs = queue.next_songs

    songs_lst = [] if len(old_next_songs) == 0 else old_next_songs.split(",")
    if len(songs_lst) >= 10:
        songs_lst[9] = songId
    else:
        songs_lst.append(songId)

    queue.next_songs = ",".join(str(v) for v in songs_lst)
    db.session.commit()

    return queue.to_dict()
