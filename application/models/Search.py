from application.models.Questions import Question
from index import db

def searchQuestions (searchString):
	searchTerms = searchString.split(" ")
	idMatches = []
	response = []

	for x in searchTerms: #find questions for each word of the search
		searchMatches = db.session.query(Question).filter(Question.title.contains(x)).all()
	print(searchMatches)
	if searchMatches is not None:
		#iterate through all returned questions
		for y in searchMatches:

				#check if we have seen the question id before (to avoid duplicates)
			if y.id not in idMatches: #add id to seen ids
				idMatches.append(y.id) #add question to set
			response.append(y)
	print(response)
	return response
		