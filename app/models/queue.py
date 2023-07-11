from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Queue(db.Model):
    __tablename__ = "queues"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    prev_songs = db.Column(db.String(255))
    curr_song =  db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id")), nullable=False
    )
    next_songs = db.Column(db.String(255))

    songs = db.relationship("Song", back_populates="queue")
    user = db.relationship("User", back_populates="queue")

    def to_dict(self):
        dct = {
            "id": self.id,
        }

        return dct
