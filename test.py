from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

def test_questions():
    Questions.createQuestion("Question", "Please Answer", "software", 1)
    Questions.getQuestionsByUser(1)


def test_answers():
    Answers.createAnswer("My Answer", 3, 10)
    assert Answers.getAnswersByQuestion(10)


def test_users():
    Users.createUser("Marc", "Hamill", "starwarsfan", "wookie", "Space", "chewbaca", True)
    assert Users.getUser("starwarsfan")


# Create instance of flask application
app = Flask(__name__, template_folder='static/build', static_folder='static/build')
app.config.from_pyfile('config.py')

app.config.update(SQLALCHEMY_DATABASE_URI='sqlite:///./test.db')
# Delete db
if os.path.exists(os.path.dirname(os.path.abspath(__file__)) + "\\test.db"):
    os.remove(os.path.dirname(os.path.abspath(__file__)) + "\\test.db")

# Create db
db = SQLAlchemy(app)


# Run the app
CORS(app)

if __name__ == '__main__':
    from application.models import Answers, Questions, Users

    test_users()
    test_questions()
    print("done")
    exit(0)

