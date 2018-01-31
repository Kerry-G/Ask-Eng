'''
This file documents the api routes for the login information. It maps api calls that will return the users
Check out this link for the API:
https://en.wikipedia.org/wiki/Representational_state_transfer#Relationship_between_URL_and_HTTP_methods
'''

from flask import Flask, Blueprint, redirect, render_template, url_for, session, request, logging
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
    return json.dumps(['foo', {'bar': ('baz', None, 1.0, 2)}])


@users.route('/api/users/', methods=httpMethods)
def usersRoute():
    data = toDict(request.data)  # toDict takes the request data and converts it to a dictionary

    success = False  # assume the response is unsucessful
    message = ""  # assume an empty message
    status = ""  # accepted statues: 'OK', 'DENIED', 'FAILURE', 'WARNING', 'INVALID'
    response = {}  # assume the response is empty dict() for now

    if request.method == 'POST':
        # Create a user and find our whether it is successful or not
        success = Users.createUser(fname=data['fname'], lname=data['lname'], email=data['email'],
                                   password=data['password'], engineer=data['engineer'],
                                   display_image=data['display_image'])

        if success:
            status = "OK"
            message = "User added."
        else:
            status = "FAILURE"
            message = "Duplicate Email."

        response = json.dumps({'success': success, 'status': status, 'message': message})

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

    elif request.method == 'DELETE':
        success = False
        status = "DENIED"
        message = "Cannot delete all users."

    response = json.dumps({'success': success, 'status': status, 'message': message, 'users': users})


@users.route('/api/users/<string:id>', methods=httpMethods)
def userRoute(id):
    data = toDict(request.data)

    if request.method == 'PUT':
        # Modify a user and find our whether it is successful or not
        success = Users.modifyUser(id, fname=data['fname'], lname=data['lname'], engineer=data['engineer'],
                                   display_image=data['display_image'])

        if success:
            status = "OK"
            message = "User information Updated."
        else:
            status = "FAILURE"
            message = "User does not exist."

        response = json.dumps({'success': success, 'status': status, 'message': message})

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

        response = json.dumps({'success': success, 'status': status, 'message': message, 'user': user})

    elif request.method == 'DELETE':
        # Get the user
        success = Users.deleteUser(id)
        if success:
            status = "OK"
            message = "User deleted"
        else:
            status = "FAILURE"
            message = "User not found"
        response = json.dumps({'success': success, 'status': status, 'message': message})
