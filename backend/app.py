import os
from flask import Flask, abort, jsonify, request
from models import setup_db, User, Project, db
from flask_cors import CORS
from hashlib import sha256
import jwt
import datetime

JWT_SECRET = os.environ.get('JWT_SECRET', 'abc123abc1234')

def _get_jwt(user_id):
    exp_time = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    payload = {
        'exp': exp_time,
        'nbf': datetime.datetime.utcnow(),
        'id': user_id
    }
    return jwt.encode(payload, JWT_SECRET, algorithm='HS256')

def create_app(test_config=None):
    app = Flask(__name__)
    app.app_context().push()
    setup_db(app)
    CORS(app)

    @app.route('/')
    def get_greeting():
        excited = os.environ['EXCITED']
        greeting = "Hello" 
        if excited == 'true': 
            greeting = greeting + "!!!!! You are doing great in this Udacity project."
        return greeting

    @app.route('/coolkids')
    def be_cool():
        return "Be cool, man, be coooool! You're almost a FSND grad!"

    @app.route('/users')
    def get_users():
        qUser = User.query.order_by(User.id).all()
        users = [u.format() for u in qUser]
        return jsonify(
            {
                "success": True,
                "users": users
            }
        )

    @app.route('/projects')
    def get_all_projects():
        qProject = Project.query.order_by(Project.id.desc()).all()
        projects = [p.format() for p in qProject]

        return jsonify(
            {
                "success": True,
                "projects": projects
            }
        )

    @app.route('/users/<int:id>/projects')
    def get_projects_by_user(id):
        qUser = User.query.filter(User.id == id).one_or_none()
        if qUser is None:
            return jsonify(
                {
                    "success": False,
                    "msg": "User not found"
                }
            )

        qProject = Project.query.filter(Project.user_id == id).all()
        projects = [p.format() for p in qProject]

        return jsonify(
            {
                "success": True,
                "projects": projects
            }
        )

    @app.route('/signup', methods=['POST'])
    def signup():
        username = request.get_json().get('username')
        email = request.get_json().get('email')
        password = request.get_json().get('password')
        if not username:
            return jsonify(
                {
                    "message": "no username provided"
                }, 400)
        elif User.query.filter(User.username == username).one_or_none() is not None:
            return jsonify(
                {
                    "message": "User existed"
                }, 409)

        if not email:
            return jsonify(
                {
                    "message": "no email provided"
                }, 400)
        elif User.query.filter(User.email == email).one_or_none() is not None:
            return jsonify(
                {
                    "message": "Email existed"
                }, 409)

        if not password:
            return jsonify(
                {
                    "message": "no password provided"
                }, 400)
        password = sha256(password.encode('utf-8')).hexdigest()

        newUser = User(username, password, email)
        try:
            db.session.add(newUser)
            db.session.commit()
        except:
            abort(422)

        return jsonify(
            {
                "success": True,
                "message": "User was signed up successfully!",
                "projects": newUser.format()
            }
        )

    @app.route('/login', methods=['POST'])
    def login():
        username = request.get_json().get('username')
        password = request.get_json().get('password')
        if not username:
            return jsonify(
                {
                    "message": "No user provided!"
                }, 400)

        qUser = User.query.filter(User.username == username).one_or_none()
        if qUser is None:
            return jsonify(
                {
                    "message": "User doesn't existed!"
                }, 404)

        if not password:
            return jsonify(
                {
                    "message": "no password provided"
                }, 400)

        password = sha256(password.encode('utf-8')).hexdigest()
        if password != qUser.password:
            return jsonify(
                {
                    "message": "Wrong password!"
                }, 401)
        
        return jsonify(token=_get_jwt(qUser.id))

    return app

app = create_app()

if __name__ == '__main__':
    app.run()
