from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Create instance of flask application
app = Flask(__name__, template_folder='static')
app.config.from_pyfile('config.py')

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/<path:path>', methods=['GET'])
def all(path):
    return render_template('index.html')

# Create db
db = SQLAlchemy(app)

# import api's
from application.api.users import users

# Attach VR to app
app.register_blueprint(users)