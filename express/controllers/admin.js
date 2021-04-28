const Product = require('./../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('./admin/edit-product', {
    docTitle: 'Add Product | Node EN',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editMode = Boolean(req.query.editMode);

  if (!editMode) {
    res.redirect('/');
  }

  Product.findById(productId, (product) => {
    if (!product) {
      res.redirect('/');
    } else {
      res.render('./admin/edit-product', {
        docTitle: 'Edit Product | Node EN',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    }
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;

  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedPrice = req.body.price;

  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
  updatedProduct.save();

  res.redirect('/admin/products');
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then((result) => {
    console.log('New Product has been created!');
  }).catch((error) => {
    console.log('Error while saving a Product to the DB: ', error);
  });
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

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.deleteById(productId);
  res.redirect('/admin/products');
};