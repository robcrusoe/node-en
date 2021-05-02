const getDB = require('./../utils/database').getDB;

const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class Product {
  constructor(title, price, description, imageUrl, _id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = _id ? new ObjectId(_id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDB();

    if (this._id) {
      // Updates the Product
      return db.collection('products').updateOne({
        _id: this._id
      }, {
        $set: this
      });
    }
    else {
      // Insert the new Product
      return db.collection('products').insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('products').find().toArray();
  }

  static findById(prodId) {
    const db = getDB();
    return db.collection('products').find({
      _id: new ObjectId(prodId)
    }).next();
  }

  static deleteById(prodId) {
    const db = getDB();
    return db.collection('products').deleteOne({
      _id: new ObjectId(prodId)
    });
  }
}

module.exports = Product;