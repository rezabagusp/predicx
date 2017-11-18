var sequlize = require('./../dbsequelize');

module.exports = function(sequlize, DataType){
    return sequlize.define('kategori', {
        nama_kategori: DataType.STRING,
    });
}