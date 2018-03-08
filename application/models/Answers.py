from datetime import datetime
import sys


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(1000))
    register_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    accepted = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, nullable=False)
    question_id = db.Column(db.Integer, nullable=False)
    ups = db.Column(db.Integer)
    downs = db.Column(db.Integer)
    is_deleted = db.Column(db.Boolean)

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
        yield 'is_deleted', self.is_deleted


# Initializes the database
db.create_all()


# Returns True if user exists
def answerExists(id):
    return Answer.query.filter_by(id=id).first() is not None and Answer.query.filter_by(id=id).first().is_deleted is False


# Returns True if answer is created
def createAnswer(text, user_id, question_id):
    try:
        # Create the new Answer
        answer = Answer(text=text, accepted=False, user_id=user_id, question_id=question_id, ups=0, downs=0, is_deleted=False)

        # Add it
        db.session.add(answer)

        # Commit it
        db.session.commit()

        response = answer
    except:
        response = False

    return response


# Returns True if answer is found
def getAnswer(id):
    answer = Answer.query.filter_by(id=id).first()
    if answer is None or answer.is_deleted is True:
        return None
    else:
        return dict(answer)


# Returns True if answer is deleted
def deleteAnswer(id, user_id):
    response = False
    if answerExists(id):
        answer = Answer.query.filter_by(id=id).first()
        if answer.user_id == user_id:
            response = True
            answer.is_deleted=True
            db.session.commit()
    return response


# NOT SURE IF WORKS, SHOULD BE TESTED
def modifyAnswer(id, text):
    response = False
    answer = getAnswer(id)
    if answer is not None and answer.is_deleted is False:
        answer.text = text
        db.session.commit()
        response = True
    return response


def getAnswersByUser(user_id):
    response = []

    answers = Answer.query.filter_by(user_id=user_id).all()

    if answers is not None:
        for answer in answers:
            if answer.is_deleted is False:
                response.append(dict(answer))
    return response


def getAnswersByQuestion(question_id):
    response = []

    answers = Answer.query.filter_by(question_id=question_id).all()

    if answers is not None:
        for answer in answers:
            if answer.is_deleted is False:
                response.append(dict(answer))
    return response


def acceptAnswer(id):
    answer = Answer.query.filter_by(id=id).first()
    response = False
    if answer is not None and answer.is_deleted is False:
        response = True
        answer.accepted = True
        db.session.commit()
    return response
