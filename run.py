from index import app
from config import SECRET_KEY as key
from flask_cors import CORS
import sys
# Run the app
CORS(app)
port = 5000
if(len(sys.argv) == 2) :
	port = int(sys.argv[1])
# Run the app
if __name__ == '__main__':
	app.secret_key = key
	app.run(debug=True, port=port)









