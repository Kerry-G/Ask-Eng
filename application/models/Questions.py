from index import db
from datetime import datetime
from models import Answers, Users

class Question(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(30))
	text = db.Column(db.String(1000))
	register_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	engineer = db.Column(db.String(30))
	closed = db.Column(db.Boolean)
	user_id = db.Column(db.Integer, nullable=False)
	ups = db.Column(db.Integer)
	downs = db.Column(db.Integer)

	def __repr__(self):
		return '<Question %r>' % self.id

	# the Questions object can now be iterated over. (also allows us to convert to a dict() )
	def __iter__(self):
		yield 'id', self.id
		yield 'title', self.title
		yield 'text', self.text
		yield 'register_date', str(self.register_date)
		yield 'engineer', self.engineer
		yield 'closed', self.closed
		yield 'user_id', self.user_id
		yield 'ups', self.ups
		yield 'downs', self.downs


# Initializes the database
db.create_all()
	

# Returns True if user exists
def questionExists(id):
	return User.query.filter_by(id=id).first() is not None



# Returns True if user is created
def createQuestion(title, text, engineer, user_id):
	try:
		# Create the new Question
		question = Question(title=title, text=text, engineer=engineer, closed=False, user_id=user_id, ups=0, downs=0)

		# Add it
		db.session.add(question)

		# Commit it
		db.session.commit()

		# set the response to the question
		response = question
	except:
		response = {}

	return response


# Returns the question if question is found
def getQuestion(id):
	question = Question.query.filter_by(id=id).first()
	if question is None:
		return None
	else:
		return dict(question)



# Returns True if question is deleted
def deleteQuestion(id):
		response = False
		if questionExists(id):
			response = True
			question = Question.query.filter_by(id=id).first()
			db.session.remove(question)
			db.session.commit()
		return response

# NOT SURE IF WORKS, SHOULD BE TESTED
def modifyQuestion(id, title, text, engineer):
	response = False
	question = getQuestion(id)
	if question is not None:
		question.engineer = engineer
		question.title = title
		question.text = text
		db.session.add(question)
		db.session.commit()
		response = True
		response = question
	return response



# Get all Question returns list of users or an empty list
def getQuestions(limit=20):
	response = []

	if limit is None:
		questions = Question.query.all()
	else:
		questions = Question.query.limit(limit).all()

	if questions is not None:
		for question in questions:
			response.append(dict(question))
	return response

def getQuestionsByUser(user_id):
	response = []

	questions = Question.query.filter_by(user_id=user_id).all()

	if questions is not None:
		for question in questions:
			response.append(dict(question))
	return response

def getQuestionByEngineer(engineer):
	response = []

	questions = Question.query.filter_by(engineer=engineer).all()

	if questions is not None:
		for question in questions:
			response.append(dict(question))
	return response










