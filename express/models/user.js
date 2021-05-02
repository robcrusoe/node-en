const getDB = require('./../utils/database').getDB;

const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  static findById(userId) {
    const db = getDB();

    return db.collection('users').findOne({
      _id: new ObjectId(userId)
    }).then(user => {
      return user;
    }).catch(error => {
      console.log('Error while retrieving User from DB: ', error);
    })
  }
}

module.exports = User;