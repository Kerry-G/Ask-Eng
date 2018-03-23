from datetime import datetime
from application.models.Users import User
from application.models import Votes
import sys
if len(sys.argv) >= 2:
	arg = sys.argv[2]
else:
	arg = "run"
if arg == "test":
	from test import db, app
else:
	from index import db, app


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
	tags = db.Column(db.String(1000))

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
		yield 'tags', self.tags
	



# Initializes the database
db.create_all()


# Returns True if user exists
def questionExists(id):
	return Question.query.filter_by(id=id).first() is not None


# Returns True if user is created
def createQuestion(title, text, engineer, user_id,tags=""):
	try:
		# Create the new Question
		question = Question(title=title, text=text, engineer=engineer, closed=False, user_id=user_id, ups=0, downs=0, tags=tags)

		# Add it
		db.session.add(question)

		# Commit it
		db.session.commit()

		# set the response to the question
		response = dict(question)
	except:
		response = {}

	return response


# Returns the question if question is found
def getQuestion(id, loggedin_id=-1):
	question = Question.query.filter_by(id=id).first()
	if question is None:
		return None
	else:
		question = dict(question)
		question['vote_status'] = Votes.getVote(loggedin_id, question['id'], 'question')['vote_status']
	return question

# Returns True if question is deleted
def deleteQuestion(id):
	response = False
	if questionExists(id):
		response = True
		question = Question.query.filter_by(id=id).first()
		db.session.delete(question)
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
		db.session.commit()
		response = True
		response = question
	return response

def updateTags(id, tags):
	response = False
	question = Question.query.filter_by(id=id).first()
	if question is not None:
		question.tags = tags
		db.session.commit()
		response = True
	return response


# Get all Question returns list of users or an empty list
def getQuestions(loggedin_id, limit=20):
	from application.models import Users
	from application.models import Votes
	response = []

	if loggedin_id < 0: # means user is not logged in
		print("NOT LOGGED IN")

	if limit is None:
		questions = Question.query.all()
	else:
		questions = Question.query.limit(limit).all()

	if questions is not None:
		for question in questions:
			user = Users.User.query.filter_by(id=question.user_id).first()
			ques = dict(question)
			if user is None:
				ques['user'] = {}
			else:
				ques['user'] = dict(user)

			if loggedin_id == -1:
				ques['vote_status'] = {'vote_status':0}
			else:
				try:
					ques['vote_status'] = Votes.getVote(loggedin_id, ques['id'], 'question')['vote_status']
				except KeyError:
					ques['vote_status'] = {'vote_status':0}
			response.append(ques)
	return response


def getQuestionsByUser(user_id, loggedin_id):
	from application.models import Users
	from application.models import Votes
	response = []

	if loggedin_id < 0: # means user is not logged in
		print("NOT LOGGED IN")

	questions = Question.query.filter_by(user_id=user_id).all()
	if questions is not None:
		for question in questions:
			user = Users.User.query.filter_by(id=question.user_id).first()
			ques = dict(question)
			if user is None:
				ques['user'] = {}
			else:
				ques['user'] = dict(user)

			if loggedin_id == -1:
				ques['vote_status'] = {'vote_status':0}
			else:
				try:
					ques['vote_status'] = Votes.getVote(loggedin_id, ques['id'], 'question')['vote_status']
				except KeyError:
					ques['vote_status'] = {'vote_status':0}
			response.append(ques)
	return response


# Get all Question returns list of users or an empty list
def getQuestionsByEngineer(engineer, loggedin_id):
	from application.models import Users
	from application.models import Votes
	response = []

	if loggedin_id < 0: # means user is not logged in
		print("NOT LOGGED IN")


	questions = Question.query.filter_by(engineer=engineer).all()


	if questions is not None:
		for question in questions:
			user = Users.User.query.filter_by(id=question.user_id).first()
			ques = dict(question)
			if user is None:
				ques['user'] = {}
			else:
				ques['user'] = dict(user)

			if loggedin_id == -1:
				ques['vote_status'] = {'vote_status':0}
			else:
				try:
					ques['vote_status'] = Votes.getVote(loggedin_id, ques['id'], 'question')['vote_status']
				except KeyError:
					ques['vote_status'] = {'vote_status':0}
			response.append(ques)
	return response

def getQuestionsByBoth(engineer, user_id, loggedin_id):
	from application.models import Users
	from application.models import Votes
	response = []

	if loggedin_id < 0: # means user is not logged in
		print("NOT LOGGED IN")


	questions = Question.query.filter_by(engineer=engineer, user_id=user_id).all()


	if questions is not None:
		for question in questions:
			user = Users.User.query.filter_by(id=question.user_id).first()
			ques = dict(question)
			if user is None:
				ques['user'] = {}
			else:
				ques['user'] = dict(user)

			if loggedin_id == -1:
				ques['vote_status'] = {'vote_status':0}
			else:
				try:
					ques['vote_status'] = Votes.getVote(loggedin_id, ques['id'], 'question')['vote_status']
				except KeyError:
					ques['vote_status'] = {'vote_status':0}
			response.append(ques)
	return response



