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

@users.route('/api/users/<string:path>', methods=['PUT','GET'])
def newUser(path):
	data = request.data
	print(str(data))
	if request.method == 'PUT':

		# Create a user and find our whether it is successful or not
		sucess = Users.createUser(fname=data.fname, lname=data.lname, email=data.email, password=data.password, engineer=data.engineer, display_image=data.display_image)
		message = str(sucess)
		# if sucess then return succesful response, else return error response
	else:
		sucess = False
		message = "No HTTP request"

	response = json.dumps({"success":sucess, "message":message})
	return response

