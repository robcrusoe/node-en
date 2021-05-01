const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://robcrusoe:j8KLWdQCCKH13wJz@cluster-fb-0.vkg7v.mongodb.net/shop?retryWrites=true&w=majority'
  ).then(client => {
    console.log('MongoDB connection successful!');
    _db = client.db();
    callback();
  }).catch(error => {
    console.log('MongoDB connection failed: ', error);
    throw error;
  });
};

const getDB = () => {
  if (_db) {
    return _db;
  }

  throw 'No database found!';
};

module.exports = {
  'mongoConnect': mongoConnect,
  'getDB': getDB
};