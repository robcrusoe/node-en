const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://robcrusoe:j8KLWdQCCKH13wJz@cluster-fb-0.vkg7v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  ).then(result => {
    console.log('MongoDB connection successful!');
    callback(result);
  }).catch(error => {
    console.log('MongoDB connection failed: ', error);
  });
};

module.exports = mongoConnect;