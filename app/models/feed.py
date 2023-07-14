from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy import UniqueConstraint


class Feed(db.Model):
    __tablename__ = "feeds"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    last_seen = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    UniqueConstraint("user_id")

    user = db.relationship("User", back_populates="feed")

    def to_dict(self):
        dct = {
            "id": self.id,
            "user_id": self.user_id,
            "last_seen": self.last_seen
        }

        return dct
