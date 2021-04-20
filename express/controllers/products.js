const products = [];

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
  products.push({ title: req.body.title });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  /* The following uses the default templating engine to return the correct template ... */
  res.render('./shop', {
    prods: products,
    docTitle: 'Shop | Node EN',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
