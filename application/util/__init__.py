import json


def convertRequestDataToDict(data):
	data  = data.decode('utf8').replace("'",'"')
	data = json.loads(data)
	return data