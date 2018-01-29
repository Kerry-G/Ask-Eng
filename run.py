from index import app
from config import SECRET_KEY as key
from flask_cors import CORS
# Run the app
CORS(app)

# Run the app
if __name__ == '__main__':
	app.secret_key = key
	app.run(debug=True)









