from index import db
from datetime import datetime
from passlib.hash import sha256_crypt


class User(db.Model):

	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(30), unique=True, nullable=False)
	email = db.Column(db.String(120), unique=True, nullable=False)
	password_hash = db.Column(db.String(100), nullable=False)
	register_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	role = db.Column(db.String(30), unique=True, nullable=False) 


	def __repr__(self):
		return '<User %r %r>' % self.username % self.email


