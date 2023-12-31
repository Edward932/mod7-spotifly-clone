from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Queue, Song

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


@queue_routes.route("/next")
@login_required
def next_song():
    queue = Queue.query.filter(Queue.user_id == current_user.id).one()

    if len(queue.next_songs) == 0:
        return queue.to_dict()

    next_songs = queue.next_songs.split(",")

    prev_songs = [] if len(queue.prev_songs) == 0 else queue.prev_songs.split(",")
    if len(prev_songs) >= 10:
        prev_songs.pop(0)

    if queue.curr_song is not None:
        prev_songs.append(queue.curr_song)

    next_song_id = next_songs.pop(0)
    song = Song.query.filter(Song.id == next_song_id).one_or_none()
    if song is None:
        queue.curr_song = None
    else:
        queue.curr_song = next_song_id

    queue.next_songs = ",".join(str(v) for v in next_songs)
    queue.prev_songs = ",".join(str(v) for v in prev_songs)

    db.session.commit()

    return queue.to_dict()


@queue_routes.route("/next-songs")
@login_required
def get_next_songs():
    queue = Queue.query.filter(Queue.user_id == current_user.id).one().to_dict()
    next_songs_lst = queue["nextSongs"]

    songs = Song.query.filter(Song.id.in_(next_songs_lst)).all()

    song_dct = { song.id: song.to_dict() for song in songs }

    songs_lst = [ song_dct.get(int(num_str), None) for num_str in next_songs_lst if song_dct.get(int(num_str), None) is not None]

    return { "songs": songs_lst }


@queue_routes.route("/next", methods=["POST"])
@login_required
def set_next_songs():
    queue = Queue.query.filter(Queue.user_id == current_user.id).one()
    new_next_songs_lst = request.json
    if len(new_next_songs_lst) == 0:
        queue.next_songs = ""
    else:
        queue.next_songs = ",".join([ str(val) for val in new_next_songs_lst ])

    db.session.commit()

    return { "songs": new_next_songs_lst }


@queue_routes.route("/prev")
@login_required
def prev_song():
    queue = Queue.query.filter(Queue.user_id == current_user.id).one()

    if len(queue.prev_songs) == 0:
        return queue.to_dict()

    prev_songs = queue.prev_songs.split(",")

    next_songs = [] if len(queue.next_songs) == 0 else queue.next_songs.split(",")
    if len(next_songs) >= 10:
        next_songs.pop()

    if queue.curr_song is not None:
        next_songs.insert(0, queue.curr_song)


    prev_song_id = prev_songs.pop()
    song = Song.query.filter(Song.id == prev_song_id).one_or_none()
    if song is None:
        queue.curr_song = None
    else:
        queue.curr_song = prev_song_id

    queue.next_songs = ",".join(str(v) for v in next_songs)
    queue.prev_songs = ",".join(str(v) for v in prev_songs)

    db.session.commit()

    return queue.to_dict()
