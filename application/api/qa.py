from flask import Flask, Blueprint, redirect, render_template, url_for, session, request, logging
from index import app
from application.models import Users, Questions, Answers, Votes
from application.util import convertRequestDataToDict as toDict
from passlib.hash import sha256_crypt
import json

# This is a Blueprint object. We use this as the object to route certain urls 
# In /index.py we import this object and attach it to the Flask object app
# This way all the routes attached to this object will be mapped to app as well.
qa = Blueprint('qa', __name__)

# A list of the accepted http methods
httpMethods = ['PUT', 'GET', 'POST', 'DELETE']


def questionResponse(question, loggedin_id=-1):
	if question is None:
		return None
	else:
		answers = []
		print(len(Answers.getAnswersByQuestion(question['id'],loggedin_id)))
		for answer in Answers.getAnswersByQuestion(question['id'],loggedin_id):
			answer['user'] = Users.getUser(answer['user_id'])
			answers.append(answer)
			app.logger.info(answer)
		question['answers'] = answers
		return question




def validateQuestionRequest(request):
	try:
		return request['title'] == '' and request['text'] == '' and request['engineer'] == '' 
	except KeyError:
		return False


@qa.route('/api/qa/', methods=httpMethods)
def index():
	return json.dumps({'success': True, 'status': 'OK', 'message': 'Ping is sucussful.'})


@qa.route('/api/qa/questions/', methods=httpMethods)
def questionsRoute():
	data = toDict(request.data)  # toDict takes the request data and converts it to a dictionary

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now
	question = {}
	questions = []


	if validateQuestionRequest(data):
		message = "Invalid data request object (title, text, engineer, user_id)."
		status = "FAILURE"
		# make the response a json object
		response = json.dumps({'success': success, 'status': status, 'message': message, 'question': question})
	elif request.method == 'POST':
		# get tags from post request, if not set then there are no tags
		try:
			tags = data['tags']
		except:
			tags = ''
		
		# Create a user and find our whether it is successful or not
		question = Questions.createQuestion(data['title'], data['text'], data['engineer'], data['user_id'], tags=tags)

		print("---------------------")
		app.logger.info(question)
		print("---------------------")

		if question is not None:
			success = True
			status = "OK"
			message = "Question added."
			question = questionResponse(question)
		else:
			success = False
			status = "FAILURE"
			message = "Error."

		# make the response a json object
		response = json.dumps({'success': success, 'status': status, 'message': message, 'question': question})
	elif request.method == 'GET':
		# url get request 
		questionArgs = request.args.to_dict()

		# get logged in user id, if it's set then continue, else set it to -1
		try: 
			id = int(questionArgs['loggedin_id'])
		except:
			id = -1
		app.logger.info("USER ID (-1 means logged out): " + str(id))


		if 'question_id' in questionArgs:
			q = Questions.getQuestion(questionArgs['question_id'], id)
			app.logger.info(q)
			question = questionResponse(q,id)
			app.logger.info(question)
			success = True
			status = 'OK'
			message = 'Question with anwsers.'
		elif 'user_id' in questionArgs and 'engineer' not in questionArgs:
			questions = Questions.getQuestionsByUser(questionArgs['user_id'], id)
			success = True
			status = 'OK'
			message = 'List of several questions by user_id'
		elif 'user_id' in questionArgs and 'engineer' in questionArgs:
			questions = Questions.getQuestionsByBoth(questionArgs['engineer'], questionArgs['user_id'], id)
			success = True
			status = 'OK'
			message = 'List of several questions by user_id'
		elif 'engineer' in questionArgs:
			questions = Questions.getQuestionsByEngineer(questionArgs['engineer'], id)
			success = True
			status = 'OK'
			message = 'List of several questions by engineer'
		else:
			questions = Questions.getQuestions(id)
			success = True
			status = 'OK'
			message = 'List of several questions'
		
		if 'sort' in questionArgs and 'reverse' in questionArgs:
			questions = sorted(questions, key=lambda k: k[questionArgs['sort']],reverse=int(questionArgs['reverse']))
		elif 'sort' in questionArgs:
			questions = sorted(questions, key=lambda k: k[questionArgs['sort']])

		if question:
			response = json.dumps({'success': success, 'status': status, 'message': message, 'question':question })
		else:
			response = json.dumps({'success': success, 'status': status, 'message': message, 'questions':questions })

	else:
		success = False
		status = "WARNING"
		message = "HTTP method invalid."
		response = json.dumps({'success': success, 'status': status, 'message': message})

	return response


# VOTING ROUTE
@qa.route('/api/qa/questions/<string:id>', methods=httpMethods)
def questionsIDRoute(id):
	data = toDict(request.data)  # toDict takes the request data and converts it to a dictionary

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now


	if request.method == 'PUT':
		try:
			vote_status = data['vote_status']
			Votes.setVote(user_id=data['loggedin_id'], comment_id=id, comment_status=data['comment_status'], vote_status=vote_status)
			vote = Votes.getVote(user_id=data['loggedin_id'], comment_id=id, comment_status=data['comment_status'])
			response = json.dumps({'success': True, 'status': 'OK', 'message': 'Vote is set.'})
		except KeyError:
			response = json.dumps({'success': False, 'status': 'FAILURE', 'message': 'Not proper keys.'})

	return response

# TAG ROUTE
@qa.route('/api/qa/tags/<string:id>', methods=httpMethods)
def updateTags(id):
	data = toDict(request.data)
	if request.method == 'PUT':
		try:
			Questions.updateTags(id,data['tags'])
			app.logger.info(data['tags'])
			response = json.dumps({'success': True, 'status':'OK', 'message':'Tags updated.'})
		except KeyError:
			response = json.dumps({'success':False, 'status':'FAILURE', 'message': 'Tags not updated.'})
	else:
		response = json.dumps({'success': False, 'status': 'FAILURE', 'message': 'Not proper keys.'})
	
	return response


@qa.route('/api/qa/answer/', methods=httpMethods)
def answerQuestion():
	data = toDict(request.data)  # toDict takes the request data and converts it to a dictionary

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now
	answer = {}

	if request.method == 'POST':

		# Create a user and find our whether it is successful or not
		answer = Answers.createAnswer(data['text'], data['user_id'], data['question_id'])

		if answer is not None:
			answer['user'] = Users.getUser(answer['user_id'])
			success = True
			status = "OK"
			message = "Answer added."
		else:
			success = False
			status = "FAILURE"
			message = "Error."

		# make the response a json object
		response = json.dumps({'success': success, 'status': status, 'message': message, 'question': answer})

	return response
