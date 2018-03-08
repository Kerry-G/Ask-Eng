'''
This file documents the api routes for the search information. It maps api calls that will return the results of the search
Check out this link for the API:
https://en.wikipedia.org/wiki/Representational_state_transfer#Relationship_between_URL_and_HTTP_methods
'''

from flask import Flask, Blueprint, redirect, render_template, url_for, session, request, logging
from index import app
from application.models import Search, Questions
from application.util import convertRequestDataToDict as toDict
from passlib.hash import sha256_crypt
import json

# This is a Blueprint object. We use this as the object to route certain urls 
# In /index.py we import this object and attach it to the Flask object app
# This way all the routes attached to this object will be mapped to app as well.
search = Blueprint('search', __name__)


# A list of the accepted http methods
httpMethods = ['PUT', 'GET', 'POST', 'DELETE']


@search.route('/api/', methods=httpMethods)
def index():
	return json.dumps({'success': True, 'status': 'OK', 'message': 'Ping is sucussful.'})


@search.route('/api/search/', methods=httpMethods)
def searchRoute():
	data = request.args.to_dict()  # toDict takes the request data and converts it to a dictionary

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now
	answers = [] # set the answers to an empty list
	answer = {} # assume there is none answer


	if request.method == 'POST': # UPDATE FOR PROPER METHOD
		if 'searchString' in data:
			answers = Search.searchQuestions(searchString=data['searchString'])
		if answers != []:
			success = True
			status = "OK"
			message = "Search was successful"
		 
		else:
			success = False
			status = "FAILURE"
			message = "No answers"

		# make the response a json object
		response = json.dumps({'success': success, 'status': status, 'message': message, 'answers': answer})
  
	elif request.method == 'DELETE':
		success = False
		status = "DENIED"
		message = "Nothing to delete"
		response = json.dumps({'success': success, 'status': status, 'message': message})
	else:
		success = False
		status = "WARNING"
		message = "HTTP method invalid."
		response = json.dumps({'success': success, 'status': status, 'message': message})

	return response






