from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import UniqueConstraint


class Queue(db.Model):
    __tablename__ = "queues"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    prev_songs = db.Column(db.String(255), default="")
    curr_song =  db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id"))
    )
    next_songs = db.Column(db.String(255), default="")

    UniqueConstraint("user_id")

    songs = db.relationship("Song", back_populates="queue")
    user = db.relationship("User", back_populates="queue")

    def to_dict(self):
        prev_songs_lst = [] if len(self.prev_songs) == 0 else self.prev_songs.split(",")
        next_songs_lst = [] if len(self.next_songs) == 0 else self.next_songs.split(",")

        dct = {
            "id": self.id,
            "currSong": self.curr_song,
            "prevSongs": prev_songs_lst,
            "nextSongs": next_songs_lst
        }

        return dct
