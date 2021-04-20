const Product = require('./../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('./admin/add-product', {
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
  Product.fetchAll((products) => {
    res.render('./admin/products', {
      prods: products,
      docTitle: 'Admin Products | Node EN',
      path: '/admin/products',
    });
  });
};
