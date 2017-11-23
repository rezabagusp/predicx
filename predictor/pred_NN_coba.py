import pickle, json, sys, getopt
from sklearn.preprocessing import StandardScaler
from sklearn.externals import joblib 

model_name = ""
data = []

def main(argv):
	usage = "Usage:\
					 \ntest.py -m <model_name> -d <data>\n \
					 \nEx: test.py -m \"model_name\" -d \"5,5,6\" \
					 \nModel name is not requiring extension (.pkl). Data (d) size must be respect to model\n\
					 \n[Optional] \
					 \n-h --help\tShow usage \
					"

	if(not len(argv)):
		print(usage)
		sys.exit(2)

	try:
		opts, args = getopt.getopt(argv,"hm:d:",["help=", "model=", "data="])
	except getopt.GetoptError:
		print(usage)
		sys.exit(2)

	for (opt,arg) in opts:
		if opt in ('-h', "--help"):
			print(usage)
			sys.exit()
		elif opt in ("-m", "--model"):
			global model_name
			model_name = arg
		elif opt in ("-d", "--data"):
			global data
			data = arg.split(',')

	if data == "" or model_name == "":
		print(usage)
		sys.exit()


if __name__ == '__main__':
	main(sys.argv[1:])

	try:
		mlp = joblib.load('model/'+model_name+'.pkl')
		scaler = joblib.load('model/'+model_name+'_scaler.pkl')
	except FileNotFoundError:
		print('No such model name!')
		sys.exit()

	x = mlp.predict(scaler.transform([data]))[0]
	# print(x)

	if(x == 6):
		print('A')
	elif(x == 5):
		print('AB')
	elif(x == 4):
		print('B')
	elif(x == 3):
		print('BC')
	elif(x == 2):
		print('C')
	elif(x == 1):
		print('D')
	else:
		print('E')
	# print(json.dumps(x))