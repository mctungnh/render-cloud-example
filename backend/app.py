import os
from flask import Flask, abort, jsonify
from models import setup_db, User, Project
from flask_cors import CORS

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

    return app

app = create_app()

if __name__ == '__main__':
    app.run()
