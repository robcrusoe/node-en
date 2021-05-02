const User = require('../models/user');
const Product = require('./../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
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

  Product.findById(prodId)
    .then(product => {
      res.render('./shop/product-detail', {
        path: '/products',
        docTitle: product.title + ' | Node EN',
        product: product,
      });
    })
    .catch((error) => {
      console.log('Error while fetching a single Product from DB: ', error);
    });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      console.log('products [shopController]: ', products);

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
  req.user.getCart().then(products => {
    // console.log('cart Product(s): ', products);
    res.render('./shop/cart', { path: '/cart', docTitle: 'Cart | Node EN', cartProducts: products });
  }).catch((error) => {
    console.log('Error while fetching cart for current User from DB: ', error);
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(error => {
      console.log('DB Error: ', error);
    });
};

exports.getCheckout = (req, res, next) => {
  // res.render('./shop/checkout', { path: '/checkout', docTitle: 'Checkout | Node EN' });
};

exports.getOrders = (req, res, next) => {
  // req.user.getOrders({ include: ['products'] }).then(orders => {
  //   res.render('./shop/orders', { path: '/orders', docTitle: 'Orders | Node EN', orders: orders });
  // }).catch(err => {
  //   console.log(error);
  // });
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.prodId;

  req.user.deleteItemFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postOrder = (req, res, next) => {
  // let fetchedCart;
  // console.log('postOrder Invoked [shopController]');

  // req.user.getCart().then(cart => {
  //   fetchedCart = cart;
  //   return cart.getProducts();
  // })
  //   .then(products => {
  //     console.log('products [shopController]: ', products);
  //     return req.user.createOrder()
  //       .then(order => {
  //         return order.addProducts(products.map(product => {
  //           product.orderItem = { quantity: product.cartItem.quantity };
  //           return product;
  //         }));
  //       }).catch(error => {
  //         console.log(error);
  //       });
  //   })
  //   .then(result => {
  //     return fetchedCart.setProduct(null);
  //   })
  //   .then(result => {
  //     res.redirect('/orders');
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
};