import json


def convertRequestDataToDict(data):
	if data == b'':
		return {}
	data  = data.decode('utf8').replace("'",'"')
	data = json.loads(data)
	return data