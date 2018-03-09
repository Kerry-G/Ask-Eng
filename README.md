# ASK-ENG
[![Build Status](https://travis-ci.org/Kerry-G/Ask-Eng.svg?branch=master)](https://travis-ci.org/Kerry-G/Ask-Eng)

An engineering question and answer board.

## Requirements
* Node 8.9.4
* Python 3.6

## Getting Started

#### Back-End Installation
Begin by installing the latest version of [Python 3](https://www.python.org/downloads/). Go through the wizard. If you are on Windows make sure to check off **add to environment variables**. This will install *python* (if python 3.6 is the only version of python) or *python3* (if python 2.7 is already installed on your system) globally on your system. The installation of python also calls with *pip* or *pip3* (if python 2.7 is already installed on your system). pip is a package manager for Python.

Take the config.py file that was sent to you and place it in the root of the project. Open your shell and *cd* to the root of the project. Now we can install the requirements for our projects.
```
$ pip install -r requirements.txt
```
Next we use python to run our project. You will use this command a lot for testing the web app. 
```
$ python run.py
```
The backend server should now be running on localhost:5000! Hit Ctrl+C in the shell to end the server process.


#### Front-End Installation
Begin by installing the latest version of [Node.js 8](https://nodejs.org/en/). Go through the wizard. If you are on Windows make sure to check off **add to environment variables**. The installation of Node.js also comes with *npm*. npm is a package manager for Node.js.

The development of the frontend is in /static. The project is build with [create-react-app](https://github.com/facebook/create-react-app).

From your project root *cd* to static. The first time you go in the folder, or anytime you change any module dependancies run the following command:
```
$ npm install
```

If you want to start react.
```
$ npm start
```

The frontend server should be running on localhost:3000! Hit Ctrl+C in the shell to end the server process.
You want the frontend and the backend server running at the same time in different shells. 

This project also uses [SASS](http://sass-lang.com/) as its CSS extension language. Anyone can compile scss/sass files with Ruby; however to 
make it easier you only need to run the command

```
$ npm run watch-css
```

And now whenever a file change, .scss files get compiled and the project is good to run.

## Authors

* **Kerry Gougeon** - [Kerry Gougeon](https://github.com/Kerry-G)
* **Ramez Zaid** - [Ramez Zaid](https://github.com/ramzouza) 
* **Jonathan Mongeau** - [Jonathan Mongeau](https://github.com/jonthemango)
* **Sharon Chee Yin Ho** - [Sharon Ho](https://github.com/sharon-ho)
* **Michael Magnabosco** - [Michael Magnabosco](https://github.com/linkmarche)
* **Nicolas Hudon** - [Nicolas Hudon](https://github.com/niko378)
* **Megan VanHumbeck** - [Megan VanHumbeck](https://github.com/megan-vanhumbeck)
* **Jamal Ghamraoui** - [Jamal Ghamraoui](https://github.com/JamalG16)
