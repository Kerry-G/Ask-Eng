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
    answers = []

    if request.method == 'POST':
        app.logger.info(data)
        # Create a user and find our whether it is successful or not
        question = Questions.createQuestion(data['title'], data['text'], data['engineer'], data['user_id'])

        if question:
            success = True
            status = "OK"
            message = "Question added."
            for answer in Answers.getAnswersByQuestion(question['id']):
                answer['user'] = Users.getUser(answer['user_id'])
                answers.append(answer)
        else:
            success = False
            status = "FAILURE"
            message = "Error."
            answers = []

        # make the response a json object
        response = json.dumps(
            {'success': success, 'status': status, 'message': message, 'question': question, 'answers': answers})
    elif request.method == 'GET':
        questions = Questions.getQuestions(limit=20)

        # make the response a json object
        response = json.dumps({'success': success, 'status': status, 'message': message, 'questions': questions})



    else:
        success = False
        status = "WARNING"
        message = "HTTP method invalid."
        response = json.dumps({'success': success, 'status': status, 'message': message})

    return response


@qa.route('/api/qa/questions/<string:id>', methods=httpMethods)
def questionRoute(id):
    # convert request data to dictionary
    data = toDict(request.data)  # toDict takes the request data and converts it to a dictionary

    success = False  # assume the response is unsucessful
    message = ""  # assume an empty message
    status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
    response = {}  # assume the response is empty dict() for now
    question = {}
    answers = []

    if request.method == 'PUT':
        # Modify a user and find our whether it is successful or not
        question = Questions.modifyQuestion(id, data['title'], data['text'], data['engineer'])

        if question:
            success = True
            status = "OK"
            message = "Question added."
            for answer in Answers.getAnswersByQuestion(question['id']):
                answer['user'] = Users.getUser(answer['user_id'])
                answers.append(answer)
        else:
            success = False
            status = "FAILURE"
            message = "Error."
            answers = []

    elif request.method == 'GET':
        # Get the question
        question = Questions.getQuestion(id)

        if question is not None:
            success = True
            status = "OK"
            message = "Question returned."
            for answer in Answers.getAnswersByQuestion(question['id']):
                answer['user'] = Users.getUser(answer['user_id'])
                answers.append(answer)
        else:
            success = False
            status = "FAILURE"
            message = "No user by that id."

    elif request.method == 'DELETE':
        # Get the user
        success = Users.deleteUser(id)

        if success:
            status = "OK"
            message = "User deleted"
        else:
            status = "FAILURE"
            message = "User not found"
    else:
        success = False
        status = "WARNING"
        message = "HTTP method invalid."

    response = json.dumps(
        {'success': success, 'status': status, 'message': message, 'question': question, 'answers': answers})
