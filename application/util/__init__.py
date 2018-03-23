import json


def convertRequestDataToDict(data):
	if data == b'':
		return {}
	data  = data.decode('utf8')
	data = json.loads(data)
	return data


def dump(data):
	return str(data) + ":(" + str(type(data)) + ")"





