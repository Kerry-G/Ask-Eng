'''
This file documents the api routes for the login information. It maps api calls that will return the users
Check out this link for the API:
https://en.wikipedia.org/wiki/Representational_state_transfer#Relationship_between_URL_and_HTTP_methods
'''

from flask import Flask, Blueprint, redirect, render_template, url_for, session, request, logging
from flask_mail import Message, Mail
from index import app
from application.models import Users
from application.util import convertRequestDataToDict as toDict
from passlib.hash import sha256_crypt
import json

# This is a Blueprint object. We use this as the object to route certain urls 
# In /index.py we import this object and attach it to the Flask object app
# This way all the routes attached to this object will be mapped to app as well.
users = Blueprint('users', __name__)


# A list of the accepted http methods
httpMethods = ['PUT', 'GET', 'POST', 'DELETE']


@users.route('/api/', methods=httpMethods)
def index():
	return json.dumps({'success': True, 'status': 'OK', 'message': 'Ping is sucussful.'})


@users.route('/api/users/', methods=httpMethods)
def usersRoute():
	data = toDict(request.data)  # toDict takes the request data and converts it to a dictionary

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now
	users = [] # set the users to an empty list
	user = {} # assume there is none User


	if request.method == 'POST':


		# Create a user and find our whether it is successful or not
		success = Users.createUser(fname=data['fname'], lname=data['lname'], email=data['email'],
									   password=data['password'], engineer=data['engineer'],
									   display_image=data['display_image'])
		if success:
			status = "OK"
			user_id = Users.getUserId(email=data['email'])
			mail = Mail(app)
			msg = Message("Email confirmation",
						  recipients=[data['email']])
			msg.html = "<body>To confirm your email please click on this link: http://localhost:3000/users/" + str(user_id) + "</body>"
			mail.send(msg)
		else:
			status = "FAILURE"
			message = "Duplicate Email."

		# make the response a json object
		response = json.dumps({'success': success, 'status': status, 'message': message, 'user': user})

	elif request.method == 'GET':
		# Get all users
		users = Users.getUsers()
		if users != []:
			success = True
			status = "OK"
			message = "Users returned."
		else:
			success = False
			status = "FAILURE"
			message = "Duplicate Email"

		response = json.dumps({'success': success, 'status': status, 'message': message, 'users': users})

	elif request.method == 'DELETE':
		success = False
		status = "DENIED"
		message = "Cannot delete all users."
		response = json.dumps({'success': success, 'status': status, 'message': message})
	else:
		success = False
		status = "WARNING"
		message = "HTTP method invalid."
		response = json.dumps({'success': success, 'status': status, 'message': message})

	return response


@users.route('/api/users/<string:id>', methods=httpMethods)
def userRoute(id):
	# convert request data to dictionary
	data = toDict(request.data)

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now
	user = {} # set the users to an empty list


	if request.method == 'PUT':
		# Modify a user and find our whether it is successful or not
		app.logger.info(data)
		success = Users.modifyUser(id, fname=data['fname'], lname=data['lname'], engineer=data['engineer'], email=data['email'])

		if success:
			status = "OK"
			message = "User information Updated."
		else:
			status = "FAILURE"
			message = "User does not exist."

	elif request.method == 'GET':
		# Get the user
		user = Users.getUserById(id)

		if user is not None:
			success = True
			status = "OK"
			message = "User returned."
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
	
	response = json.dumps({'success': success, 'status': status, 'message': message,'user':user})

	return response



@users.route('/api/users/authenticate/', methods=httpMethods)
def userAuthenticate():

	# convert request data to dictionary
	data = toDict(request.data)

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now
	user = {}
	
	# If the reques is POST we assume your trying to login
	if request.method == 'POST':
		# Verify User  
		success = Users.userVerified(data['email'], data['password'])

		# if verified then get the user
		if success:
			user = Users.getUser(data['email'])
			message = "User authenticated."
			status = "OK"
			response = json.dumps({'success': success, 'status': status, 'message': message,'user':user})
		# else the user is not authenticates, request is denied
		else:
			message = "User not authenticated."
			status = "DENIED"

	else:
		message = "HTTP method invalid."
		status = "WARNING"
		success = False

	response = json.dumps({'success': success, 'status': status, 'message': message,'user':user})
	return response


@users.route('/api/users/email/', methods=httpMethods)
def emailRoute():

	# convert request data to dictionary
	data = toDict(request.data)

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now


	# If the request is POST we assume your trying to get email
	if request.method == 'POST':

		# Check if user exists
		success = Users.userExists(data['email'])

		if success:
			message = "User exists."
			status = "WARNING"
		else:
			message = "User does not exist."
			status = "OK"
	else:
		message = "HTTP method invalid."
		status = "WARNING"
		success = False

	response = json.dumps({'success': success, 'status': status, 'message': message})
	return response


@users.route('/api/users/confirm/<string:id>', methods=httpMethods)
def userConfirm(id):
	# convert request data to dictionary

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now

	if Users.confirmUser(id):
		message = "User confirmed"
		status = "OK"
		success = True
	else:
		message = "User does not exist or already confirmed"
		status = "WARNING"
		success = False

	assert Users.userIsConfirmed(id)
	response = json.dumps({'success': success, 'status': status, 'message': message})
	return response


@users.route('/api/users/displayImage/', methods=httpMethods)
def displayimageRoute():
	# convert request data to dictionary
	data = toDict(request.data)

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now


	# If the request is PUT we assume your're trying to update the display_image
	if request.method == 'PUT':

		# Check if display image change wroks
		success = Users.updateDisplayImage(data['user_id'], data['display_image'])

		if success:
			message = "display_image updated."
			status = "OK"
		else:
			message = "display_image could not be updated, no user with that id."
			status = "FAILURE"
	else:
		message = "HTTP method invalid."
		status = "WARNING"
		success = False

	response = json.dumps({'success': success, 'status': status, 'message': message})
	return response

@users.route('/api/users/password/<string:id>', methods=httpMethods)
def newPassword(id):
	# convert request data to dictionary
	data = toDict(request.data)

	success = False  # assume the response is unsucessful
	message = ""  # assume an empty message
	status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
	response = {}  # assume the response is empty dict() for now
	user = {} # set the users to an empty list

	if request.method == 'PUT':
		#Change user's password
		app.logger.info(data)
		success = Users.updatePassword(email=data['email'], oldPassword=data['oldPassword'], newPassword=data['newPassword'])

		if success:
			status = "OK"
			message = "Password changed."
		else:
			status = "FAILURE"
			message = "User does not exist."

	else:
		success = False
		status = "WARNING"
		message = "HTTP method invalid."
	
	response = json.dumps({'success': success, 'status': status, 'message': message,'user':user})

	return response