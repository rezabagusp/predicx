import pandas as pd
import numpy as np
import pickle, sys, getopt, time, os

from sklearn.utils import shuffle
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report,confusion_matrix

dirname = os.path.dirname(os.path.abspath(__file__))
csv_name = ""
model_name = ""
class_name = ""
is_testing = False

def clean_file(data):
	#change 'object' type data to categorical (ordinal) data
	ordered_score = ['E', 'D', 'C', 'BC', 'B', 'AB', 'A']

	attributes = list(data.keys())

	for att in attributes:
		if data[att].dtype == np.object:
			data[att] = data[att].astype('category', ordered=True, categories=ordered_score).cat.codes
	del data['id']

	return data

def splitting(data, test_size, random_state):
	#randomize data
	data = shuffle(data)

	#separate data (X) and class (y)
	X = data.loc[:,data.columns != class_name]
	y = data.loc[:,data.columns == class_name]
	y = np.ravel(y) # convert DataFrame to array

	return train_test_split(X,y,test_size=test_size, random_state=random_state)

def preprocessing(train, test):
	#preprocessing
	scaler = StandardScaler()
	scaler.fit(train)
	train_new = scaler.transform(train)
	test_new = scaler.transform(test)

	with open(dirname+'/model/'+model_name+'_scaler.pkl', 'wb') as scale:
		pickle.dump(scaler, scale)

	return train_new, test_new


def training(X_train, y_train, X_test=None, y_test=None):
	#train data
	mlp = MLPClassifier(hidden_layer_sizes=(30,60,20))
	mlp.fit(X_train, y_train)

	if(is_testing):
		if(X_test is not None and y_test is not None):
			#testing (for testing only)
			predictions = mlp.predict(X_test)
			print(confusion_matrix(y_test,predictions))
			print(mlp.score(X_test,y_test))
			print(classification_report(y_test,predictions))
			print(predictions)
		else:
			print("No testing data!")
	else:
		with open(dirname+'/model/'+model_name+'.pkl', 'wb') as model:
			pickle.dump(mlp, model)

def main(argv):
	usage = "Usage:\
					 \ntest.py -i <csv_name> -c <class_name>\n \
					 \n[Optional] \
					 \n-h --help\tShow usage \
					 \n-t --testing\tDo and show testing result\n \
					"

	if(not len(argv)):
		print(usage)
		sys.exit(2)

	try:
		opts, args = getopt.getopt(argv,"thi:c:",["testing=", "help=", "input=","class="])
	except getopt.GetoptError:
		print(usage)
		sys.exit(2)

	for (opt,arg) in opts:
		if opt in ('-h', "--help"):
			print(usage)
			sys.exit()
		elif opt in ("-t", "--testing"):
			global is_testing
			is_testing = True
		elif opt in ("-c", "--class"):
			global class_name
			class_name = arg
		elif opt in ("-i", "--input"):
			global csv_name
			csv_name = arg

	global model_name
	model_name = csv_name[:-4]
	
	if csv_name == "" or class_name == "":
		print(usage)
		sys.exit()

if __name__ == '__main__':
	main(sys.argv[1:])

	try:
		nilai = pd.read_csv('data/'+csv_name)
	except FileNotFoundError:
		print("No such file!")
		sys.exit(2)

	nilai = clean_file(nilai)

	X_train,X_test,y_train,y_test = splitting(nilai,0.10,32)
	X_train,X_test = preprocessing(X_train,X_test)

	if(is_testing):
		training(X_train,y_train,X_test,y_test)
	else:
		training(X_train,y_train)
	print("Done!")


'''
#read file
nilai = pd.read_csv('data/smt3_mat219_test.csv')
#change 'object' type data to categorical (ordinal) data
ordered_score = ['E', 'D', 'C', 'BC', 'B', 'AB', 'A']

nilai['mat100'] = nilai['mat100'].astype('category', ordered=True, categories=ordered_score).cat.codes
nilai['mat103'] = nilai['mat103'].astype('category', ordered=True, categories=ordered_score).cat.codes
nilai['mat219'] = nilai['mat219'].astype('category', ordered=True, categories=ordered_score).cat.codes
del nilai['id'] #don't need it

#randomize data
nilai = shuffle(nilai)

#separate data (X) and class (y)
X = nilai.loc[:,nilai.columns != "mat219"]
y = nilai.loc[:,nilai.columns == "mat219"]
y = np.ravel(y) # convert DataFrame to array

X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.10, random_state=32)

#preprocessing
scaler = StandardScaler()
scaler.fit(X_train)
X_train = scaler.transform(X_train)
X_test = scaler.transform(X_test)

try:
	with open('model/smt3_mat219_test_scaler.pkl', 'wb') as scale:
		pickle.dump(scaler, scale)
except:
	exit()

#train data
mlp = MLPClassifier(hidden_layer_sizes=(10,60,30))
mlp.fit(X_train,y_train)

#testing (for testing only)
# predictions = mlp.predict(X_test)
# print(confusion_matrix(y_test,predictions))
# print(mlp.score(X_test,y_test))
# print(classification_report(y_test,predictions))
# print(predictions)

print('Creating model...')
try:
	with open('model/smt3_mat219_test.pkl', 'wb') as model:
		pickle.dump(mlp, model)
	print('Model created...')
except:
	print('Failed to create model, please try again.')

'''

