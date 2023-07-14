from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Song
from app.aws import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from app.forms import SongForm
from sqlalchemy import exc
from werkzeug.datastructures import FileStorage

songs_routes = Blueprint('songs', __name__)

@songs_routes.route('/<int:songId>')
@login_required
def song(songId):
    """
    Query for one song and return a dict
    """
    song = Song.query.get(songId)
    return song.to_dict()

@songs_routes.route('', methods=["POST"])
@login_required
def post_song():
    form = SongForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        song = form.data["song_file"]
        song.filename = get_unique_filename(song.filename)
        upload = upload_file_to_s3(song)
        print(upload)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when you tried to upload
            # so you send back that error message (and you printed it above)
            return { "error": upload }

        url = upload["url"]
        new_song = Song(
            name=form.data["name"],
            aws_src=url,
            owner_id=current_user.id,
            description=form.data["description"]
        )
        db.session.add(new_song)
        try:
            db.session.commit()
        except exc.IntegrityError as e:
            print(e)
            return { "error": {
                "name": ["Song name is taken. Please change name and upload agian"]
            }}
        return { "song": new_song.to_dict() }

    else:
        return { "error": form.errors }


@songs_routes.route("/search")
@login_required
def search_songs():
    search_name = request.args.get('name')
    songs = Song.query.filter(Song.name.ilike(f"%{search_name}%")).all()

    return [ song.to_dict() for song in songs ]


@songs_routes.route("/user")
@login_required
def user_songs():
    songs = Song.query.filter(Song.owner_id == current_user.id).all()

    return [ song.to_dict() for song in songs ]


@songs_routes.route("/<int:songId>", methods=["DELETE"])
@login_required
def delete_song(songId):
    song = Song.query.get(songId)
    if song.owner_id == current_user.id:
        remove = remove_file_from_s3(song.aws_src)
        print(remove)

        if remove is not True:
            return remove

        db.session.delete(song)
        db.session.commit()
        return { "songId": song.id }

    return { "error": "Only the creater of a song can delete it"}


@songs_routes.route("/<int:songId>", methods=["PUT"])
@login_required
def update_song(songId):
    song = Song.query.get(songId)

    if song.owner_id != current_user.id:
        return { "error": "Only the song owner can update a song"}

    form = SongForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.data["song_file"] is None:
        file = FileStorage(filename="test.mp3")
        form["song_file"].data = file

        if form.validate_on_submit():
            song.name = form.data["name"]
            song.description = form.data["description"]

            try:
                db.session.commit()
            except exc.IntegrityError as e:
                return { "error": {
                    "name": ["Song name is taken. Please change name and upload agian"]
                }}
            return song.to_dict()

        else:
            return { "error": form.errors }

    elif form.validate_on_submit():
        new_song = form.data["song_file"]
        new_song.filename = get_unique_filename(new_song.filename)
        upload = upload_file_to_s3(new_song)

        remove = remove_file_from_s3(song.aws_src)

        if "url" not in upload:
            return { "error": upload }

        url = upload["url"]

        song.name = form.data["name"]
        song.description = form.data["description"]
        song.aws_src = url

        db.session.commit()
        return song.to_dict()

    return { "error": form.errors }
