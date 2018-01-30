'''
This file documents the api routes for the login information. It maps api calls that will return the users

'''

from flask import Flask, Blueprint, redirect, render_template, url_for, session, request, logging
from application.models import Users
from application.util import *
from passlib.hash import sha256_crypt
import json

# This is a Blueprint object. We use this as the object to route certain urls 
# In /index.py we import this object and attach it to the Flask object app
# This way all the routes attached to this object will be mapped to app as well.
users = Blueprint('users', __name__)

# Index 

@users.route('/api/', methods=['GET','OPTIONS'])
def index():
	return json.dumps(['foo', {'bar': ('baz', None, 1.0, 2)}])

@users.route('/api/users/', methods=['PUT','GET'])
def newUser():
	data = request.data
	data  = data.decode('utf8').replace("'",'"')
	data = json.loads(data)
	print(data)
	success = False
	if request.method == 'PUT':

		# Create a user and find our whether it is successful or not
		success = Users.createUser(fname=data['fname'], lname=data['lname'], email=data['email'], password=data['password'], engineer=data['engineer'], display_image=data['display_image'])
		if success:
			message = "Users has been created"
		else:
			message = "Users already exists"

	else:
		success = False
		message = "No HTTP request"

	response = json.dumps({"success":success, "message":message})
	return response

