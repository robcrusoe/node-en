const Product = require('./../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    docTitle: 'Add Product | Node EN',
    path: '/admin/add-product',
    activeAddProduct: true,
    productCSS: true,
    formsCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();

  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll((products) => {
    res.render('./shop', {
      prods: products,
      docTitle: 'Shop | Node EN',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
