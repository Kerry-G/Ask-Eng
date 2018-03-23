from datetime import datetime
from application.models import Votes
import sys
if len(sys.argv) >= 2:
	arg = sys.argv[2]
else:
	arg = "run"
if arg == "test":
	from test import db
else:
	from index import db


class Answer(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	text = db.Column(db.String(1000))
	register_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	accepted = db.Column(db.Boolean)
	user_id = db.Column(db.Integer, nullable=False)
	question_id = db.Column(db.Integer, nullable=False)
	ups = db.Column(db.Integer)
	downs = db.Column(db.Integer)

	def __repr__(self):
		return '<Answer %r>' % self.id

	# the Answers object can now be iterated over. (also allows us to convert to a dict() )
	def __iter__(self):
		yield 'id', self.id
		yield 'text', self.text
		yield 'register_date', str(self.register_date)
		yield 'accepted', self.accepted
		yield 'user_id', self.user_id
		yield 'question_id', self.question_id
		yield 'ups', self.ups
		yield 'downs', self.downs


# Initializes the database
db.create_all()


# Returns True if user exists
def answerExists(id):
	return Answer.query.filter_by(id=id).first() is not None


# Returns True if answer is created
def createAnswer(text, user_id, question_id):
	try:
		# Create the new Answer
		answer = Answer(text=text, accepted=False, user_id=user_id, question_id=question_id, ups=0, downs=0)

		# Add it
		db.session.add(answer)

		# Commit it
		db.session.commit()

		response = answer
	except:
		response = False

	return dict(response)


# Returns True if answer is found
def getAnswer(id):
	answer = Answer.query.filter_by(id=id).first()
	if answer is None:
		return None
	else:
		answer = dict(answer)
		return answer


# Returns True if answer is deleted
def deleteAnswer(id):
	response = False
	if answerExists(id):
		response = True
		answer = Answer.query.filter_by(id=id).first()
		db.session.delete(answer)
		db.session.commit()
	return response


# NOT SURE IF WORKS, SHOULD BE TESTED
def modifyAnswer(id, text):
	response = False
	answer = getAnswer(id)
	if answer is not None:
		answer.text = text
		db.session.commit()
		response = True
	return response


def getAnswersByUser(user_id, loggedin_id=-1):
	response = []

	answers = Answer.query.filter_by(user_id=user_id).all()

	if answers is not None:
		for answer in answers:
			ans = dict(answer)
			if loggedin_id == -1:
				ans['vote_status'] = {'vote_status':0}
			else:
				try:
					ans['vote_status'] = Votes.getVote(loggedin_id, ans['id'], 'answer')['vote_status']
				except KeyError:
					ans['vote_status'] = {'vote_status':0}
			response.append(dict(ans))
	return response


def getAnswersByQuestion(question_id, loggedin_id=-1):
	response = []

	answers = Answer.query.filter_by(question_id=question_id).all()

	if answers is not None:
		for answer in answers:
			ans = dict(answer)
			if loggedin_id == -1:
				ans['vote_status'] = {'vote_status':0}
			else:
				try:
					ans['vote_status'] = Votes.getVote(loggedin_id, ans['id'], 'answer')['vote_status']
				except KeyError:
					ans['vote_status'] = {'vote_status':0}
			response.append(dict(ans))
	return response


def acceptAnswer(id):
	answer = Answer.query.filter_by(id=id).first()
	response = False
	if answer is not None:
		response = True
		answer.accepted = True
		db.session.commit()
	return response

