import os
from sqlalchemy import Column, String, create_mock_engine
from sqlalchemy_utils import database_exists, create_database
from flask_sqlalchemy import SQLAlchemy
import json

database_path = os.environ['DATABASE_URL']
if database_path.startswith("postgres://"):
  database_path = database_path.replace("postgres://", "postgresql://", 1)

db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''
def setup_db(app, database_path=database_path):
    if not database_exists(database_path):
      create_database(database_path)
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()

'''
User
Have username, email, password
'''
class User(db.Model):  
  __tablename__ = 'User'

  id = Column(db.Integer, primary_key=True)
  username = Column(String)
  email = Column(String)
  password = Column(String)

  def __init__(self, username, password, email):
    self.username = username
    self.password = password
    self.email = email

  def format(self):
    return {
      'id': self.id,
      'username': self.username,
      'email': self.email
    }
    
'''
Project
Have name, link, image, tag
'''
class Project(db.Model):
  __tablename__ = 'Project'
  
  id = Column(db.Integer, primary_key=True)
  name = Column(String)
  link = Column(String)
  image = Column(String)
  category = Column(String)
  user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)

  def __init__(self, name, link, image, category):
    self.name = name
    self.link = link
    self.image = image
    self.category = category

  def format(self):
    return {
      'name' : self.name,
      'link' : self.link,
      'image' : self.image,
      'category' : self.category
    }