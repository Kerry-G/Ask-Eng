from application.models import Questions

def searchQuestions (searchString):
    searchTerms = searchString.split(" ")
    idMatches = []
    response = []

    for x in searchTerms:
	#find questions for each word of the search
        searchMatches = Question.query.filter(title.contains(x)).all()
	
	if searchMatches is not None:
	    #iterate through all returned questions
	    for y in searchMatches:

                #check if we have seen the question id before (to avoid duplicates)
                if y.id not in idMatches: 
                    #add id to seen ids
		    idMatches.append(y.id)
		    #add question to set
                    response.append(y)

    return response
        