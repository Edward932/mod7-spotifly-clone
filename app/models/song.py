from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    aws_src = db.Column(db.String(255), unique=True, nullable=False)
    owner_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    description = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    user = db.relationship("User", back_populates="songs")
    queue = db.relationship("Queue", back_populates="songs")

    def to_dict(self, timestamps=False):
        dct = {
            "id": self.id,
            "name": self.name,
            "aws_src": self.aws_src,
            "owner_id": "FIX THIS BY QUERRYING FOR OWNER",
            "description": self.description
        }

        if timestamps:
            dct["createdAt"] = self.created_at
            dct["updatedAt"] = self.updated_at

        return dct
