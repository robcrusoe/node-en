const getDB = require('./../utils/database').getDB;

const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart; // Embedded documents - { items: [] }
    this._id = ObjectId(id)
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else {
      updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
    }

    const db = getDB();
    return db.collection('users').updateOne({
      _id: this._id
    }, {
      $set: {
        cart: {
          items: updatedCartItems
        }
      }
    });
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