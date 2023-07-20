from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import UniqueConstraint


class Follow(db.Model):
    __tablename__ = "follows"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    following_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )

    follower = db.relationship("User", foreign_keys=[follower_id])
    following = db.relationship("User", foreign_keys=[following_id])

    __table_args__ = (UniqueConstraint("follower_id", "following_id", name="_unique_follower"),)

    def to_dict_following(self):
        dct = {
            "id": self.id,
            "following": self.following_id
        }
        return dct

    def to_dict_followers(self):
        dct = {
            "id": self.id,
            "follower": self.follower_id
        }
        return dct
