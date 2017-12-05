import json, sys, getopt, os, warnings
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
	dirname = os.path.dirname(os.path.abspath(__file__))

	try:
		with warnings.catch_warnings():
			warnings.simplefilter("ignore", category=UserWarning)
			mlp = joblib.load(dirname+'/model/'+model_name+'.pkl')
			scaler = joblib.load(dirname+'/model/'+model_name+'_scaler.pkl')
	except FileNotFoundError:
		print(json.dumps({"message": "No such model name!"}))
		sys.exit()

	x = mlp.predict(scaler.transform([data]))[0]
	probability = mlp.predict_proba(scaler.transform([data]))[0]
	out = {}

	mutu = ['E', 'D', 'C', 'BC', 'B', 'AB', 'A']
	out['prediksi_mutu'] = mutu[x]

	i = 0
	prob = {}
	for p in probability:
		percentage = p*100
		prob[mutu[i]] = "%.3f" % (percentage)
		i += 1

	out['probability'] = prob
	out['message'] = "success"
	
	print(json.dumps(out))