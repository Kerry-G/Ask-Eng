from flask import Flask, Blueprint, redirect, render_template, url_for, session, request, logging
from index import app
from application.models import Users, Questions, Answers
from application.util import convertRequestDataToDict as toDict
from passlib.hash import sha256_crypt
import json

# This is a Blueprint object. We use this as the object to route certain urls 
# In /index.py we import this object and attach it to the Flask object app
# This way all the routes attached to this object will be mapped to app as well.
qa = Blueprint('qa', __name__)

# A list of the accepted http methods
httpMethods = ['PUT', 'GET', 'POST', 'DELETE']


def questionResponse(question):
    if question is None or question.is_deleted is True:
        return None
    else:
        answers = []
        for answer in Answers.getAnswersByQuestion(question['id']):
            if answer.is_deleted is False
                answer['user'] = Users.getUser(answer['user_id'])
                answers.append(answer)
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
        response = json.dumps(
            {'success': success, 'status': status, 'message': message, 'question': question})
    elif request.method == 'POST':

        # Create a user and find our whether it is successful or not
        question = Questions.createQuestion(data['title'], data['text'], data['engineer'], data['user_id'])

        app.logger.info(question)
        if question is not None and question.is_deleted is False:
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
        if 'question_id' in questionArgs:
            q = Questions.getQuestion(questionArgs['question_id'])
            question = questionResponse(q)
            success = True
            status = 'OK'
            message = 'Question with anwsers.'
        elif 'user_id' in questionArgs and 'engineer' not in questionArgs:
            questions = Questions.getQuestionsByUser(questionArgs['user_id'])
            success = True
            status = 'OK'
            message = 'List of several questions by user_id'
        elif 'user_id' in questionArgs and 'engineer' in questionArgs:
            questions = Questions.getQuestionsByBoth(questionArgs['engineer'], questionArgs['user_id'])
            success = True
            status = 'OK'
            message = 'List of several questions by user_id'
        elif 'engineer' in questionArgs:
            questions = Questions.getQuestionByEngineer(questionArgs['engineer'])
            success = True
            status = 'OK'
            message = 'List of several questions by engineer'
        else:
            questions = Questions.getQuestions()
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

@qa.route('/api/qa/questions/<string:id>', methods=httpMethods)
def questionsIDRoute(id):
    data = toDict(request.data)  # toDict takes the request data and converts it to a dictionary

    success = False  # assume the response is unsucessful
    message = ""  # assume an empty message
    status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
    response = {}  # assume the response is empty dict() for now


    if request.method == 'PUT':
        if data['actions'] == 'ups':
            success = Questions.incrementUps(id)
        if data['actions'] == 'downs':
            success = Questions.incrementDowns(id)

    response = json.dumps({'success': success, 'status': status, 'message': message})
    print(response)
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


        if answer is not None and answer.is_deleted is False:
            answer['user'] = Users.getUser(answer['user_id'])
            success = True
            status = "OK"
            message = "Answer added."
        else:
            success = False
            status = "FAILURE"
            message = "Error."

        # make the response a json object
        response = json.dumps({'success': success, 'status': status, 'message': message, 'question': question})


