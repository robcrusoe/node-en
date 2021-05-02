const getDB = require('./../utils/database').getDB;
const mongodb = require('mongodb');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDB();
    return db.collection('products').insertOne(this);
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('products').find().toArray();
  }

  static findById(prodId) {
    const db = getDB();
    return db.collection('products').find({
      _id: mongodb.ObjectId(prodId)
    }).next();
  }
}

module.exports = Product;