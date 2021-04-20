const Product = require('./../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('./shop/product-list', {
      prods: products,
      docTitle: 'Products | Node EN',
      path: '/products',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('./shop/index', {
      prods: products,
      docTitle: 'Shop | Node EN',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('./shop/cart', { path: '/cart', docTitle: 'Cart | Node EN' });
};

exports.getCheckout = (req, res, next) => {
  res.render('./shop/checkout', { path: '/checkout', docTitle: 'Checkout | Node EN' });
};
