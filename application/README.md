# Backend README
Check out the [API](https://github.com/Kerry-G/SOEN341-UB2/wiki/Users-API) as well


## Navigating the Backend API

#### What in the world is `__init__.py`?
`__init__.py` is a special python file. It's usually empty. Essentially when `__init__.py` is put inside a directory it makes the directory a python package. Meaning just like python files themselves, the folder can be imported. This is what allows us to import python files from api and models. api and models are actually python packages and not just regular directories. For more information check out the [Python 3 docs on packages](https://docs.python.org/3/tutorial/modules.html#tut-packages).


#### /api/
This folder contains all the files where our api routes are defined. Let's begin by examining the following snippet. 
```
from flask import Blueprint
users = Blueprint('users', __name__)

@users.route('/api/', methods=['PUT', 'GET', 'POST', 'DELETE'])
def index():
	return json.dumps({'success': True, 'status': 'OK', 'message': 'Ping is sucussful.'})
```

We start by declaring a variable `users` and instantiating an object `Blueprint`, what this does is not really important except for the fact that it is required. It will by imported by index.py and be 'attached' to our app. The next line is harder to discern `@users.route('/api/', methods=['PUT', 'GET', 'POST', 'DELETE'])`. This is the syntax for a decorator. We essentially are saying here `when the /api/ route is reached with any of these http methods please launch the function below me`. Index runs and returns a json object saying `yeah you've reached me`. We establish this route to make it easy for the front-end to determine if its connected to the backend.

Now if you check out the tables in the [api](https://github.com/Kerry-G/SOEN341-UB2/wiki/Users-API) you will notice that different data is returned depending on the httpMethod used. We can access the http method of the request by importing the `request` module from flask. In a routing function request.data, request.method, ect can be used to access the data sent by the user and the method chosen by the user respectivly.
 
```
from flask import request
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
			message = "User added."
		else:
			status = "FAILURE"
			message = "Duplicate Email."

		# make the response a json object
		response = json.dumps({'success': success, 'status': status, 'message': message, 'user': user})
	...

	return response
```

#### /models/

To Be Continued...



