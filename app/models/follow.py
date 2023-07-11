from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


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

    def to_dict(self):
        dct = {
            "id": self.id
        }
        return dct
