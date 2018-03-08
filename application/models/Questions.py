from datetime import datetime
from application.models.Users import User
import sys
if len(sys.argv) >= 2:
    arg = sys.argv[2]
else:
    arg = "run"
if arg == "test":
    from test import db
else:
    from index import db


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
    answer_count = db.Column(db.Integer)
    is_deleted = db.Column(db.Boolean)

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
        yield 'answer_count', self.answer_count
        yield 'is_deleted', self.is_deleted


# Initializes the database
db.create_all()


# Returns True if user exists
def questionExists(id):
    return Question.query.filter_by(id=id).first() is not None and Question.query.filter_by(id=id).first().is_deleted is False


# Returns True if user is created
def createQuestion(title, text, engineer, user_id):
    try:
        # Create the new Question
        question = Question(title=title, text=text, engineer=engineer, closed=False, user_id=user_id, ups=0, downs=0, answer_count=0, is_deleted=False)

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
def getQuestion(id):
    question = Question.query.filter_by(id=id).first()
    if question is None or question.is_deleted is True:
        return None
    else:
        return dict(question)

# Returns True if question is deleted
def deleteQuestion(id):
    response = False
    if questionExists(id):
        response = True
        question = Question.query.filter_by(id=id).first()
        question.is_deleted=True
        db.session.commit()
    return response


# NOT SURE IF WORKS, SHOULD BE TESTED
def modifyQuestion(id, title, text, engineer):
    response = False
    question = getQuestion(id)
    if question is not None and question.is_deleted is False:
        question.engineer = engineer
        question.title = title
        question.text = text
        db.session.commit()
        response = True
        response = question
    return response

# NOT SURE IF WORKS, SHOULD BE TESTED
def incrementUps(id):
    response = False
    question = Question.query.filter_by(id=id).first()
    if question is not None and question.is_deleted is False:
        question.ups = question.ups+ 1
        db.session.commit()
        response = True
    return response

def incrementDowns(id):
    response = False
    question = Question.query.filter_by(id=id).first()
    if question is not None and question.is_deleted is False:
        question.downs = question.downs + 1
        db.session.commit()
        response = True
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
            if question.is_deleted is False:
                user = User.query.filter_by(id=question.user_id).first()
                ques = dict(question)
                ques['user'] = dict(user)
                del ques['user_id']
                response.append(ques)
    return response


def getQuestionsByUser(user_id):
    response = []

    questions = Question.query.filter_by(user_id=user_id).all()

    if questions is not None:
        for question in questions:
            if question.is_deleted is False:
                user = User.query.filter_by(id=question.user_id).first()
                ques = dict(question)
                ques['user'] = dict(user)
                del ques['user_id']
                response.append(ques)
    return response


def getQuestionByEngineer(engineer):
    response = []

    questions = Question.query.filter_by(engineer=engineer).all()

    if questions is not None:
        for question in questions:
            if question.is_deleted is False:
                user = User.query.filter_by(id=question.user_id).first()
                ques = dict(question)
                ques['user'] = dict(user)
                del ques['user_id']
                response.append(ques)
    return response

def getQuestionsByBoth(engineer, user_id):
    response = []
    questions = Question.query.filter_by(user_id=user_id,engineer=engineer).all()
	
    if questions is not None:
        for question in questions:
            if question.is_deleted is False:
                user = User.query.filter_by(id=question.user_id).first()
                ques = dict(question)
                ques['user'] = dict(user)
                del ques['user_id']
                response.append(ques)
    return response

