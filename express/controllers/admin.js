const Product = require('./../models/product');
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

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

  Product.findById(productId)
    .then(product => {
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
    })
    .catch((error) => {
      console.log('Error while fetching a Product from DB: ', error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;

  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedPrice = req.body.price;

  const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, new ObjectId(prodId));

  product.save()
    .then((result) => {
      console.log('Product has been updated successfully!');
      res.redirect('/admin/products');
    })
    .catch((error) => {
      console.log('Error fetching Product from DB: ', error);
    });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product(title, price, description, imageUrl);

  product.save()
    .then((result) => {
      console.log('New Product has been created!', result);
      res.redirect('/products');
    })
    .catch((error) => {
      console.log('Error while saving a Product to the DB: ', error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('./admin/products', {
        prods: products,
        docTitle: 'Admin Products | Node EN',
        path: '/admin/products',
      });
    })
    .catch((error) => {
      console.log('Error fetching Products from DB: ', error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  // const productId = req.body.productId;

  // Product.destroy({ where: { id: productId } })
  //   .then((result) => {
  //     res.redirect('/admin/products');
  //   })
  //   .catch((error) => {
  //     console.log('Error while deleting Product: ', error);
  //   });
};
