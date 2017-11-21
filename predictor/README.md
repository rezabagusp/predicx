#Struktur Direktori
**|-data**
> Menyimpan data latih berupa kumpulan nilai-nilai dan variabel lainnya dalam format CSV. Fail contoh: smt3_mat219_test.csv

**|-model**
> Menyimpan data model hasil latih dalam formakt PKL. Fail contoh: smt3_mat219_test.pkl. Terdapat fail *scaler* yang merupakan model untuk melakukan transformasi data.

##pred_NNtraining_coba.py
*Script* untuk melakukan pelatihan data.
> TODO:
> Menerima *input argument* (python filename.py -i data.csv -c classname)

##pred_NN_coba.py
*Script* untuk melakukan prediksi
> TODO:
> Menerima *input argument* (python filename.py -m modelname.pkl -d arrayofdata)


