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

  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      if (!products) {
        res.redirect('/');
      } else {
        res.render('./admin/edit-product', {
          docTitle: 'Edit Product | Node EN',
          path: '/admin/edit-product',
          editing: editMode,
          product: products[0],
        });
      }
    })
    .catch((error) => {
      console.log('Error while fetching Product from DB: ', error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;

  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedPrice = req.body.price;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
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

  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      console.log('New Product has been created!');
      res.redirect('/products');
    })
    .catch((error) => {
      console.log('Error while saving a Product to the DB: ', error);
    });
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
    .then((products) => {
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
  const productId = req.body.productId;

  Product.destroy({ where: { id: productId } })
    .then((result) => {
      res.redirect('/admin/products');
    })
    .catch((error) => {
      console.log('Error while deleting Product: ', error);
    });
};
