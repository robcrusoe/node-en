const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../', 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice, cb) {
    let cart = { products: [], totalPrice: 0 };

    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        if (fileContent) {
          cart = JSON.parse(fileContent);
        }

        // Analyze the cart => Find existing product
        const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
        const existingProduct = cart.products[existingProductIndex];

        // Add new product / increase quantity
        let updatedProduct;
        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.qty += 1;
          cart.products = [...cart.products];
          cart.products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: id, qty: 1 };
          cart.products = [...cart.products, updatedProduct];
        }

        cart.totalPrice += +productPrice;

        // Save the cart back to the file
        fs.writeFile(p, JSON.stringify(cart), (err) => {
          if (err) {
            console.log('Error while saving to cart: ', err);
          } else {
            cb(updatedCart);
          }
        });
      }
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }

      // Read content from Cart.json
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };

      const product = updatedCart.products.find((prod) => prod.id === id);

      if (product) {
        const productQty = product.qty;

        updatedCart.totalPrice -= +(productPrice * productQty);
        updatedCart.products = updatedCart.products.filter((prod) => prod.id !== id);

        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
          console.log('Error while updating cart: ', err);
        });
      }
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        const cart = JSON.parse(fileContent);
        cb(cart);
      }
    });
  }
};
