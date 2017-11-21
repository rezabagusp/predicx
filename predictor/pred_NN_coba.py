import pickle, json
from sklearn.preprocessing import StandardScaler
from sklearn.externals import joblib 

mlp = joblib.load('model/smt3_mat219_test.pkl')
scaler = joblib.load('model/smt3_mat219_test_scaler.pkl')

x = mlp.predict(scaler.transform([[6,6,15]]))
print(x)
# print(json.dumps(x))