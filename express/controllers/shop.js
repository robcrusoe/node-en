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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log('prodId [shopController]: ', prodId);

  Product.findById(prodId, (product) => {
    console.log("product [shopController]: ", product);

    res.render('./shop/product-detail', { path: '/products', docTitle: product.title + ' | Node EN', product: product });
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

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId, (product) => {
    res.render('./shop/cart', { path: '/cart', docTitle: 'Cart | Node EN' });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('./shop/checkout', { path: '/checkout', docTitle: 'Checkout | Node EN' });
};

exports.getOrders = (req, res, next) => {
  res.render('./shop/orders', { path: '/orders', docTitle: 'Orders | Node EN' });
};
