from flask import Flask, request, render_template, Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# Create instance of flask application
app = Flask(__name__, template_folder='static/build',static_folder='static/build')
app.config.from_pyfile('config.py')



# Create Api Object
api = Api(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/<path:path>', methods=['GET','POST'])
def all(path):
    return render_template('index.html')

# Create db
db = SQLAlchemy(app)

# import api's
from application.api.users import users

# Attach VR to app
app.register_blueprint(users)