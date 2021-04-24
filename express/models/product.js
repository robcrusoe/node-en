const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../', 'data', 'products.json');

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  /* Adds the current product to the products array ... */
  save() {
    this.id = Math.random().toString();

    /* Save all products to a file */
    getProductsFromFile((products) => {
      products.push(this);
      console.log('products [read from file]: ', products);

      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log('Error while saving to file: ', error);
      });
    });
  }

  /* Fetches all the products all at once ... */
  /* `static` allows us to directly call the method on the class itself, and not on the instantiated object ... */
  static fetchAll(callback) {
    const p = path.join(__dirname, 'data', 'products.json');

    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((product) => {
        return product.id === id;
      });

      callback(product);
    });
  }
};
