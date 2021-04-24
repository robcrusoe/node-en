const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

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
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  /* Adds the current product to the products array ... */
  save() {
    /* Save all products to a file */
    getProductsFromFile((products) => {
      if (!this.id) {
        this.id = Math.random().toString();
        products.push(this);

        fs.writeFile(p, JSON.stringify(products), (error) => {
          console.log('Error while saving new product: ', error);
        });
      } else {
        const existingProductIndex = products.findIndex((prod) => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (err) {
            console.log('Error while updating product: ', error);
          }
        });
      }
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

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find(prod => prod.id === id);

      const updatedProducts = products.filter((prod) => prod.id !== id);

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) {
          console.log('Error while deleting product: ', err);
        }
        else {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
