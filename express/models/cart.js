const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../', 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    let cart = { products: [], totalPrice: 0 };

    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);

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
          }
        });
      }
    });
  }
};
