from index import db
from datetime import datetime

class Question(db.Model):

	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(120))
	text = db.Column(db.Text)
	ups = db.Column(db.Integer)
	downs = db.Column(db.Integer)
	engineer = db.Column(db.String(30))
	user_id = db.Column(db.Integer) 
	closed = db.Column(db.Boolean)
	register_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

	
	def __repr__(self):
		return '<Question %r>' % self.title
	
	def _iter_ (self):
		yield 'id', self.id
		yield 'title', self.title
		yield 'text', self.text
		yield 'ups', self.ups
		yield 'downs', self.downs
		yield 'engineer', self.engineer
		yield 'user_id', self.user_id
		yield 'closed', self.closed
		yield 'register_date', str(self.register_date)

db.create_all()

def createQuestion(title, text, engineer, user_id)
	new_question = Question(title=title, text=text, ups=0, downs=0, engineer=engineer, user_id=user_id, closed=False)
	db.session.add(new_question)
	db.session.commit()
	return True

def getQuestionById(id)
	return Quesiton.query.filter_id(id=id).first()
	
def deleteQuestion(id)
	response = False
	question = getQuestionById(id)
	if question is not None:
		response = True
		db.session.remove(question)
		db.session.commit()
	return response

def getQuestionByUser(limit=10, user_id)
	response = []
	if limit is None:
		questions = Question.query.filter_by(user_id=user_id).all()
	else:
		questions = Question.query.filter_by(user_id=user_id).limit(limit)
	if questions is not None:
		for question in questions:
			response.append(dict(question))
	return response


def getQuestionByEngineering(limit=10, engineer)
	response = []
	if limit is None:
		questions = Question.query.filter_by(engineer=engineer).all()
	else:
		questions = Question.query.filter_by(engineer=engineer).limit(limit)
	if questions is not None:
		for question in questions:
			response.append(dict(question))
	return response
