from index import db
from datetime import datetime

class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vote_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, nullable=False) # user_id
    comment_id = db.Column(db.Integer, nullable=False) # question_id or answer_id
    comment_status = db.Column(db.String(20)) # 'answer' | 'question' 
    vote_status = db.Column(db.Integer, nullable=False) # 1 => up, 0 => none, -1 => down

    def __repr__(self):
        return '<Vote %r>' % self.id

    # the Questions object can now be iterated over. (also allows us to convert to a dict() )
    def __iter__(self):
        yield 'id', self.id
        yield 'vote_date', str(self.vote_date)
        yield 'user_id', self.user_id
        yield 'comment_id', self.comment_id
        yield 'comment_status', self.comment_status
        yield 'vote_status', self.vote_status


def voteExist(user_id, comment_id, comment_status):
	return Vote.query.filter_by(user_id=user_id, comment_id=comment_id, comment_status=comment_status).first() is not None

def isUp(user_id, comment_id, comment_status):
	return Vote.query.filter_by(user_id=user_id, comment_id=comment_id, comment_status=comment_status,vote_status=1).first() is not None

def isDown(user_id, comment_id, comment_status):
	return Vote.query.filter_by(user_id=user_id, comment_id=comment_id, comment_status=comment_status, vote_status=-1).first() is not None

def getVote(user_id, comment_id, comment_status):
	if voteExist(user_id, comment_id, comment_status):
		return Vote.query.filter_by(user_id=user_id,comment_id=comment_id,comment_status=comment_status).vote_status
	return None

def setVote(user_id, comment_id, comment_status, vote_status):
	from application.models import Questions
	from application.models import Answers
	from application.models import Users

	if voteExist(user_id,comment_id,comment_status):
		vote = Vote.query.filter_by(user_id, comment_id, comment_status).first() # get the vote
	else:
		vote = Vote(user_id=user_id, comment_id=comment_id, comment_status=comment_status, vote_status=vote_status)
		db.session.add(vote)
		db.commit()
	
	if vote.vote_status != vote_status: # if the vote status changes (ie not going for up to up, down to down)
			'''
			the vote goes `from` a value `to` a value and updates the user's `up` and `down`
				from  to  ups  downs
				1     0   -1   0
				1     -1  -1   +1
				0     1   +1   0
				0     -1  0    +1
				-1    0   0    -1
				-1    1   +1   -1
			'''
			user = Users.User.query.filter_by(user_id=user_id) # get user
			model = Questions.Question if comment_status=='question' else Answers.Answer # select the correct model
			comment = model.query.filter_by(id=comment_id) # get the question or answer
			if vote.vote_status is 1:
				user.ups -= 1 # decrement the ups no matter what (1 to 0, 1 to -1)
				user.downs += abs(vote_status) # increase the downs by either 0 or 1. 0 if (1 to 0), 1 if (1 to -1). You abs(0)=0, abs(-1)=1
				comment.ups -= 1
				comment.downs += abs(vote_status)
			if vote.vote_status is -1:
				user.ups += vote_status # increase ups by 0 or 1. 0 if (-1 to 0), 1 if (-1 to 1)
				user.downs -= 1 # decrement the downs no matter what (-1 to 0, -1 to 1)
				comment.ups += vote_status
				comment.downs -= 1
			if vote.vote_status is 0 and vote_status is -1:
				user.downs += 1 # increment downs if (0 to -1)
				comment.downs += 1
			else:
				user.ups += 1 # increment ups if (0 to 1)
				comments.ups += 1

			vote.vote_status = vote_status # set the vote status
			db.session.commit()





