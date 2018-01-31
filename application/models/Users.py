from index import db
from datetime import datetime
from passlib.hash import sha256_crypt


def engineerTypes():
	return ['electrical','software','computer', 'chemical','mechanical','civil','industrial']

'''
This is a SQLAlchemy model for reference.
'''
class User(db.Model):

	id = db.Column(db.Integer, primary_key=True)
	fname = db.Column(db.String(30))
	lname = db.Column(db.String(30))
	email = db.Column(db.String(120), unique=True, nullable=False)
	password_hash = db.Column(db.String(100), nullable=False)
	register_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	engineer = db.Column(db.String(30), unique=True, nullable=False) 
	display_image = db.Column(db.String(30)) # location of image
	verified = db.Column(db.Integer)
	ups = db.Column(db.Integer)
	downs = db.Column(db.Integer)

	def __repr__(self):
		return '<User %r>' % self.email

	# the User object can now be iterated over. (also allows us to convert to a dict() )
	def __iter__(self):
	    yield 'id', self.id
	    yield 'fname', self.fname
	    yield 'lname', self.lname
	    yield 'email', self.email
	    yield 'password_hash', self.password_hash
	    yield 'register_date', self.register_date
	    yield 'engineer', self.engineer
	    yield 'display_image', self.display_image
	    yield 'verified', self.verified
	    yield 'ups', self.ups
	    yield 'downs', self.downs


# Initializes the database
db.create_all()


# Returns True if user exists
def userExists(email):
	return User.query.filter_by(email=email).first() is not None


# TODO
# Returns true is user is verified
def userVerified(email, password):
	verified = False
	return True


# Returns True if user is created
def createUser(fname, lname, email, password, engineer='software', display_image='', verified=0):
	reponse = False
	if userExists(email):
		reponse =  False # if user exists then return false
	else:
		# Hash the Password so that we are smart
		password_hash = sha256_crypt.hash(password)

		# Create the new User
		newUser = User(fname=fname, lname=lname, email=email, password_hash=password_hash, engineer=engineer, display_image=display_image, verified=verified, ups=0, downs=0)

		# Add it 
		db.session.add(newUser)

		# Commit it
		db.session.commit()

		reponse = True
	return reponse

def modifyUser(fname, lname, engineer, display_image):
	pass

# Update a user's password
def updatePassword(email, oldPassword, newPassword):
	response = False
	if userVerified(email, oldPassword):
		user = User.query.filter_by(email=email).first()
		user.password_hash = sha256_crypt.hash(newPassword)
		db.session.add(user)
		db.session.commit()

	return response

# Get all Users returns list of users or an empty list
def getUsers(limit=20):
	response = []

	if limit is None:
		users = User.query.all()
	else:
		users = User.query.limit(limit).all()

	if users is not None:
		for user in users:
			reponse.append(dict(user))
	return response

def getUserBy(id):
	pass

def deleteUser(id):
	pass












