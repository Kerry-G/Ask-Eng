# SOEN341-UB2
An engineering question and anwser board.

## Installation

# Back-End Installation
Begin by installing the latest version of [Python 3](https://www.python.org/downloads/). Go through the wizard. If you are on Windows make sure to check off 'add to environment variables'. This will install 'python' or 'python3' (if python 2.7 is already installed on your system) globally on your system. The installation of python also calls with 'pip' or 'pip3' (if python 2.7 is already installed on your system). pip is a package manager for Python.

Take the config.py file that was sent to you and place it in the root of the project. Open your shell and cd to the root of the project.

First we need to create a virtual environment to install python modules into. 
$ pip install virtualenv 

We use the virtualenv command followed by the name to create a folder 'venv' in the project. This will not be pushed due to the .gitignore file.
$ virtualenv venv

Next we want to activate the virtual environment so we can install our project's dependencies there.
If on Mac or Linux:
$ . venv/bins/activate
Else if on Windows:
$ . venv/Scripts/activate

You should now see '(venv)' before your user name in the shell. Congrats you have a virtual environment. 

Now we can install the requirements for our projects. All of our dependencies are installed.
$ pip install -r requirements.txt

Next we use python to run our project. You will use this command a lot for testing the web app. 
$ python run.py

The backend server should now be running on localhost! Hit Ctrl+C in the shell to end the server process.

# Front-End Installation

The development of the frontend is in /static.

The first time you go in the folder
$ npm install

To run it in localhost 
$ npm start

## Authors

* **Kerry Gougeon** - [Kerry Gougeon](https://github.com/Kerry-G)
* **Ramez Zaid** - [Ramez Zaid](https://github.com/ramzouza) 
* **Jonathan Mongeau** - [Jonathan Mongeau](https://github.com/jonthemango)
* **Sharon Chee Yin Ho** - [Sharon Ho](https://github.com/sharon-ho)
* **Michael Magnabosco** - [Michael Magnabosco](https://github.com/linkmarche)
* **Nicolas Hudon** - [Nicolas Hudon](https://github.com/niko378)
* **Megan VanHumbeck** - [Megan VanHumbeck](https://github.com/megan-vanhumbeck)
* **Jamal Ghamraoui** - [Jamal Ghamraoui](https://github.com/JamalG16)
