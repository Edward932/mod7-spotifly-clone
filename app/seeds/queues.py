from app.models import db, Queue, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_queues():
    queue1 = Queue(
        user_id=1,
        curr_song=2
    )
    queue2 = Queue(
        user_id=2,
        curr_song=3
    )
    queue3 = Queue(
        user_id=3,
        curr_song=2
    )

    db.session.add(queue1)
    db.session.add(queue2)
    db.session.add(queue3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_queues():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.queues RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM queues"))

    db.session.commit()
