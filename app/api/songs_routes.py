from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import db, Song
from app.aws import upload_file_to_s3, get_unique_filename
from app.forms import SongForm
from sqlalchemy import exc

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
