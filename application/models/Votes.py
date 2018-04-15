import sys

if len(sys.argv) >= 2:
	arg = sys.argv[2]
else:
	arg = "run"
if arg == "test":
	from test import db, app
else:
	from index import db, app
from datetime import datetime
from application.util import dump


class Vote(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	vote_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
	user_id = db.Column(db.Integer, nullable=False)  # user_id
	comment_id = db.Column(db.Integer, nullable=False)  # question_id or answer_id
	comment_status = db.Column(db.String(20))  # 'answer' | 'question'
	vote_status = db.Column(db.Integer, nullable=False)  # 1 => up, 0 => none, -1 => down

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


# Initializes the database
db.create_all()


def voteExist(user_id, comment_id, comment_status):
	return Vote.query.filter_by(user_id=user_id, comment_id=comment_id,
								comment_status=comment_status).first() is not None


def isUp(user_id, comment_id, comment_status):
	return Vote.query.filter_by(user_id=user_id, comment_id=comment_id, comment_status=comment_status,
								vote_status=1).first() is not None


def isDown(user_id, comment_id, comment_status):
	return Vote.query.filter_by(user_id=user_id, comment_id=comment_id, comment_status=comment_status,
								vote_status=-1).first() is not None


def getVote(user_id, comment_id, comment_status):
	if voteExist(user_id, comment_id, comment_status):
		return dict(Vote.query.filter_by(user_id=user_id, comment_id=comment_id, comment_status=comment_status).first())
	return {"vote_status": 0}


'''
the vote goes `from` a value `to` a value and updates the user's `up` and `down`
FROM	TO	user.ups	user.downs	question.ups	question.downs
0	0	FALSE	FALSE	FALSE	FALSE
0	1	1	0	1	0
0	-1	0	1	0	1
1	0	-1	0	-1	0
1	1	FALSE	FALSE	FALSE	FALSE
1	-1	-1	1	-1	1
-1	0	0	-1	0	-1
-1	1	1	-1	1	-1
-1	-1	FALSE	FALSE	FALSE	FALSE
'''


def setVote(user_id, comment_id, comment_status, vote_status):
	from application.models import Questions
	from application.models import Answers
	from application.models import Users

	if voteExist(user_id, comment_id, comment_status):
		vote = Vote.query.filter_by(user_id=user_id, comment_id=comment_id,
									comment_status=comment_status).first()  # get the vote
	else:
		vote = Vote(user_id=user_id, comment_id=comment_id, comment_status=comment_status,
					vote_status=0)  # new unset vote
		db.session.add(vote)
		db.session.commit()

	

	# if the vote status changes (ie not going for up to up, down to down)
	# vote.vote_status is the model's current vote status (1, 0, -1)
	# vote_status is the updated vote status
	app.logger.info("FROM:" + dump(vote.vote_status) + ", TO: " + dump(vote_status))
	if vote.vote_status != vote_status:
		model = Questions.Question if comment_status == 'question' else Answers.Answer  # select the correct model
		comment = model.query.filter_by(id=comment_id).first()  # get the question or answer
		if comment is not None:
			user = Users.User.query.filter_by(id=comment.user_id).first()  # get user
			
		# WHEN vote is unset and it is set up => add to ups
		# WHEN vote is unset and it is set down => add to downs
		# WHEN vote is set up and it is set down => remove up, add down
		# WHEN vote is set up and it is unset => remove up
		# WHEN vote is set down and it is set up => remove down, add up
		# WHEN vote is set down and it is unset => remove down
		if vote.vote_status == 0:
			if vote_status == 1:
				user.ups += 1
				comment.ups += 1
			elif vote_status == -1:
				user.downs += 1
				comment.downs += 1
		elif vote.vote_status == 1:
			if vote_status == 0:
				user.ups -= 1
				comment.ups -= 1
			elif vote_status == -1:
				user.ups -= 1
				comment.ups -= 1
				user.downs += 1
				comment.downs += 1
		elif vote.vote_status == -1:
			if vote_status == 0:
				user.downs -= 1
				comment.downs -= 1
			elif vote_status == 1:
				user.ups += 1
				comment.ups += 1
				user.downs -= 1
				comment.downs -= 1
		app.logger.info("USER.ups = " + str(user.ups) + ", USER.downs = " + str(user.downs))
		app.logger.info(
			comment_status + "=> COMMENT.ups = " + str(comment.ups) + ", COMMNT.downs = " + str(comment.downs))
		vote.vote_status = vote_status  # set the vote status
		db.session.commit()
