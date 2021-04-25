const Cart = require('./cart');

const db = require('./../utils/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  /* Adds the current product to the products array ... */
  save() {}

  /* Fetches all the products all at once ... */
  /* `static` allows us to directly call the method on the class itself, and not on the instantiated object ... */
  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id, callback) {}

  static deleteById(id) {}
};
