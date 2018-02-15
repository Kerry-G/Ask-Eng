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
    if question is None:
        return None
    else:
        answers = []
        for answer in Answers.getAnswersByQuestion(question['id']):
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
            {'success': success, 'status': status, 'message': message, 'question': question, 'answers': answers})
    elif request.method == 'POST':

        # Create a user and find our whether it is successful or not
        question = Questions.createQuestion(data['title'], data['text'], data['engineer'], data['user_id'])

        app.logger.info(question)
        if question[0] is not None:
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
            response = json.dumps({'success': success, 'status': status, 'message': message, 'question': question})
        elif 'user_id' in questionArgs and 'engineer' not in questionArgs:
            questions = Questions.getQuestionsById(questionArgs['user_id'])
            success = True
            status = 'OK'
            message = 'List of several questions by user_id'
            response = json.dumps({'success': success, 'status': status, 'message': message, 'questions': questions})
        elif 'user_id' in questionArgs and 'engineer' in questionsArgs:
            questions = Questions.getQuestionsByBoth(questionsArgs['engineer'], questionArgs['user_id'])
            success = True
            status = 'OK'
            message = 'List of several questions by user_id'
            response = json.dumps({'success': success, 'status': status, 'message': message, 'questions': questions})
        elif 'engineer' in questionArgs:
            questions = Questions.getQuestionsByBoth(questionsArgs['engineer'], questionArgs['user_id'])
            success = True
            status = 'OK'
            message = 'List of several questions by engineer'
            response = json.dumps({'success': success, 'status': status, 'message': message, 'questions': questions})
        else:
            questions = Questions.getQuestionsByBoth(questionsArgs['engineer'], questionArgs['user_id'])
            success = False
            status = 'FAILURE'
            message = 'Invalid arguments.'
            response = json.dumps({'success': success, 'status': status, 'message': message})
    else:
        success = False
        status = "WARNING"
        message = "HTTP method invalid."
        response = json.dumps({'success': success, 'status': status, 'message': message})

    return response

