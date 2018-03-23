from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os


def test_questions():
    # create test user
    user_id = Users.getUserId("starwarsfan")
 
    if Questions.questionExists(1):
        return 1

    Questions.createQuestion("Question", "Please Answer", "software", user_id)
    questions = Questions.getQuestionsByUser(user_id, 0)
    if not questions:
        return 2
    
    question = Questions.getQuestion(1)
    if not question:
        return 3
    
    if not Questions.getQuestionsByEngineer('software', user_id):
        return 4
 
    if not Questions.deleteQuestion(1):
        return 5

    return 0


def test_answers():
    # create test user
    user_id = Users.getUserId("starwarsfan")

    # create test question
    Questions.createQuestion("Question", "Please Answer", "software", user_id)
    question = Questions.getQuestionsByUser(user_id, 0)[0]
    question_id = question["id"]

    Answers.createAnswer("My Answer", user_id, question_id)
    answer = Answers.getAnswersByQuestion(question_id, 0)[0]
    answer_id = answer["id"]
    if not answer:
        return 1
    answer_user = Answers.getAnswersByUser(user_id, 0)[0]
    if not answer_user:
        return 2

    if answer_user["register_date"] != answer["register_date"]:
        return 3

    if not Answers.answerExists(answer_id):
        return 4

    if not Answers.deleteAnswer(answer_id):
        return 5

    return 0


def test_votes():
    # create test user
    user_id = Users.getUserId("starwarsfan")

    # create test question
    Questions.createQuestion("Question", "Please Answer", "software", user_id)
    question = Questions.getQuestionsByUser(user_id, 0)[0]
    question_id = question["id"]

    # create a test answer
    Answers.createAnswer("My Answer", user_id, question_id)
    answer = Answers.getAnswersByQuestion(question_id, 0)[0]
    answer_id = answer["id"]

    Votes.setVote(user_id, answer_id, "answer", 1)

    Votes.setVote(user_id, question_id, "question", -1)

    if Questions.getQuestion(question_id, 0)["ups"] != 0 or Questions.getQuestion(question_id, 0)["downs"] != 1:
        return 1

    if Answers.getAnswer(answer_id)["ups"] != 1 or Answers.getAnswer(answer_id)["downs"] != 0:
        return 2

    if (not Votes.isDown(user_id, question_id, "question")) or Votes.isUp(user_id, question_id, "question"):
        return 3

    if (not Votes.isUp(user_id, answer_id, "answer")) or Votes.isDown(user_id, answer_id, "answer"):
        return 4

    return 0


def test_users():
    # test with non existing user
    if Users.userExists("starwarsfan"):
        return 1
    if Users.userVerified("starwarsfan", "wookie"):
        return 2
    if Users.modifyUser(1, "Boba", "Fett", "Killer", "starwarsfan"):
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
    if not Users.modifyUser(user["id"], "Han", "Solo", "Ship", "starwarsfan"):
        return 10
    user = Users.getUser("starwarsfan")
    if user["fname"] != "Han" or user["lname"] != "Solo" or user["engineer"] != "Ship":
        return 11
    if user["password_hash"] == "wookie":
        return 12

    if Users.userIsConfirmed(user["id"]):
        return 13
    Users.confirmUser(user["id"])
    if not Users.userIsConfirmed(user["id"]):
        return 14

    user2 = Users.getUserById(user["id"])

    if user["fname"] != user2["fname"]:
        return 15
    if user["password_hash"] != user2["password_hash"]:
        return 16

    Users.updatePassword(user["email"], "wookie", "falcon")
    if Users.userVerified("starwarsfan", "wookie"):
        return 17
    if not Users.userVerified("starwarsfan", "falcon"):
        return 18

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
    from application.models import Answers, Questions, Users, Votes
    error = False
    return_code = test_users()
    if return_code != 0:
        print("backend Test failed at User, Rc=" + str(return_code))
        error = True

    return_code = test_questions()
    if return_code != 0:
        print("backend Test failed at Question, Rc=" + str(return_code))
        error = True

    return_code = test_answers()
    if return_code != 0:
        print("backend Test failed at Answers, Rc=" + str(return_code))
        error = True

    return_code = test_votes()
    if return_code != 0:
        print("backend Test failed at Votes, Rc=" + str(return_code))
        error = True

    if error:
        print("Backend Test failed")
        exit(-1)
    else:
        print("Backend Test completed")
        exit(0)
