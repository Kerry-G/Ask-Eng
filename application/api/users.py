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

@users.route('/api/', methods=['POST','OPTIONS'])
def index():
	return json.dumps(['foo', {'bar': ('baz', None, 1.0, 2)}])
