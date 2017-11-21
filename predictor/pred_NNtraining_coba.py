import pandas as pd
import numpy as np
import pickle

from sklearn.utils import shuffle
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report,confusion_matrix

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



