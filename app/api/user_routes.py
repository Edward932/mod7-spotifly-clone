from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Follow, db
from sqlalchemy import and_

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/search')
@login_required
def search_users():
    search_name = request.args.get('name')
    users = User.query.filter(User.username.ilike(f"%{search_name}%")).all()

    if len(users) == 0:
        # do somehting to show no results
        pass

    return [ user.to_dict() for user in users ]

@user_routes.route('/follow', methods=["POST"])
@login_required
def create_follow():
    following_id = request.data.decode()

    current_follow = Follow.query.filter(and_(Follow.follower_id == current_user.id, Follow.following_id == following_id)).one_or_none()

    if current_follow is None:
        new_follow = Follow(
            follower_id=current_user.id,
            following_id=following_id
        )

        db.session.add(new_follow)
        db.session.commit()

    follows = Follow.query.filter(Follow.follower_id == current_user.id).all()

    return [ follow.to_dict_following() for follow in follows ]


@user_routes.route("/follow", methods=["DELETE"])
@login_required
def delete_follow():
    following_id = request.data.decode()

    current_follow = Follow.query.filter(and_(Follow.follower_id == current_user.id, Follow.following_id == following_id)).one_or_none()

    if current_follow is not None:
        db.session.delete(current_follow)
        db.session.commit()

    follows = Follow.query.filter(Follow.follower_id == current_user.id).all()

    return [ follow.to_dict_following() for follow in follows ]


@user_routes.route("/following")
@login_required
def get_following():
    followings = Follow.query.filter(Follow.follower_id == current_user.id).all()

    return [ follow.to_dict_following() for follow in followings]
