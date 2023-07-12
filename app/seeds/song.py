from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_song():
    song1 = Song(
        name="Cool new song",
        aws_src="https://actions.google.com/sounds/v1/office/click_continuous.ogg",
        owner_id=1,
        description="Awsome new song! give it a listen"
    )
    song2 = Song(
        name="Fun rock song!",
        aws_src="https://actions.google.com/sounds/v1/science_fiction/alien_beam.ogg",
        owner_id=1,
        description="Great new rock song! give it a listen"
    )
    song3 = Song(
        name="Cool EDM song",
        aws_src="https://actions.google.com/sounds/v1/sports/bowling.ogg",
        owner_id=2,
        description="EDM is awsome! give it a listen"
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
