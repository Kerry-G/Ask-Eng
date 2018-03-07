from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os


def test_questions():
    Questions.createQuestion("Question", "Please Answer", "software", 1)
    questions = Questions.getQuestionsByUser(1)
    if questions:
        return 0
    else:
        return 1


def test_answers():
    Answers.createAnswer("My Answer", 3, 10)
    answer = Answers.getAnswersByQuestion(10)
    if answer:
        return 0
    else:
        return 1


def test_users():
    # test with non existing user
    if Users.userExists("starwarsfan"):
        return 1
    if Users.userVerified("starwarsfan", "wookie"):
        return 2
    if Users.modifyUser(1, "Boba", "Fett", "Killer"):
        return 3

    # test with existing user
    Users.createUser("Mark", "Hamill", "starwarsfan", "wookie", "Space", "chewbaca", True)
    if not Users.userExists("starwarsfan"):
        return 4
    if not Users.userVerified("starwarsfan", "wookie"):
        return 5
    if Users.userVerified("starwarsfan", "guns"):
        return 6

    user = Users.getUser("starwarsfan")
    if not user:
        return 7
    if user["fname"] != "Mark" or user["lname"] != "Hamill" or user["engineer"] != "Space" \
            or user["display_image"] != "chewbaca":
        return 8
    if user["password_hash"] == "wookie":
        return 9
    if not Users.modifyUser(user["id"], "Han", "Solo", "Ship"):
        return 10
    user = Users.getUser("starwarsfan")
    if user["fname"] != "Han" or user["lname"] != "Solo" or user["engineer"] != "Ship" \
            or user["display_image"] != "leia":
        return 11
    if user["password_hash"] == "wookie":
        return 12

    return 0


# Create instance of flask application
app = Flask(__name__, template_folder='static/build', static_folder='static/build')
app.config.from_pyfile('test_config.py')

# empty db
open(os.path.dirname(os.path.abspath(__file__)) + "\\test.db", 'w').close()

# Create db
db = SQLAlchemy(app)


# Run the app
CORS(app)

if __name__ == '__main__':
    from application.models import Answers, Questions, Users

    return_code = test_users()
    if return_code != 0:
        print("backend Test failed at User, Rc=" + str(return_code))
        exit(return_code)
    return_code = test_questions()
    if return_code != 0:
        print("backend Test failed at Question, Rc=" + str(return_code))
        exit(return_code)
    return_code = test_answers()
    if return_code != 0:
        print("backend Test failed at Question, Rc=" + str(return_code))
        exit(return_code)
    print("Backend Test completed")
    exit(0)

