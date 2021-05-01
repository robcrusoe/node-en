const Product = require('./../models/product');
const Cart = require('./../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('./shop/product-list', {
        prods: products,
        docTitle: 'Products | Node EN',
        path: '/products',
      });
    })
    .catch((error) => {
      console.log('Error while fetching Products from DB: ', error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then((product) => {
      res.render('./shop/product-detail', {
        path: '/products',
        docTitle: product.title + ' | Node EN',
        product: product,
      });
    })
    .catch((error) => {
      console.log('Error while fetching a single product from DB: ', error);
    });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('./shop/index', {
        prods: products,
        docTitle: 'Shop | Node EN',
        path: '/',
      });
    })
    .catch((error) => {
      console.log('Error fetching Products from DB: ', error);
    });
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then((cart) => {
    console.log('cart [shopController]: ', cart);

    return cart.getProducts().then(products => {
      res.render('./shop/cart', { path: '/cart', docTitle: 'Cart | Node EN', cartProducts: products });
    }).catch(error => {
      console.log('Error while loading Products in Cart: ', error);
    });
  }).catch((error) => {
    console.log('Error while fetching cart for current User from DB: ', error);
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;

  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({ where: { id: productId } });
  })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      let newQuantity = 1;
      if (product) {
        // Updates the quantity
      }

      return Product.findByPk(productId).then((product) => {
        return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
      }).catch(error => {
        console.log(error);
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(error => {
      console.log('Error while fetching the cart from DB: ', error);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render('./shop/checkout', { path: '/checkout', docTitle: 'Checkout | Node EN' });
};

exports.getOrders = (req, res, next) => {
  res.render('./shop/orders', { path: '/orders', docTitle: 'Orders | Node EN' });
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.prodId;

  Product.findById(prodId, (product) => {
    const productPrice = product.price;

    Cart.deleteProduct(prodId, productPrice);
    res.redirect('/cart');
  });
};
