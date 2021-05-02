const Product = require('./../models/product');
const Order = require('./../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
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

exports.getIndex = (req, res, next) => {
  Product.find()
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

exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      console.log('** products: ', products);

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
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      console.log('orders: ', orders);

      res.render('./shop/orders', { path: '/orders', docTitle: 'Orders | Node EN', orders: orders });
    }).catch(err => {
      console.log(error);
    });
};

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.prodId;

  req.user.removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(error => {
      console.log(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map((p) => {
        return { quantity: p.quantity, product: { ...p.productId._doc } };
      });

      console.log('*** products: ', products);

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });

      order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => {
      console.log('DB Error: ', err);
    });
};