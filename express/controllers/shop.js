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
  Cart.getCart((cart) => {
    Product.findAll()
      .then((products) => {
        const cartProducts = [];
        for (product of products) {
          const cartProductData = cart.products.find((prod) => prod.id === product.id);

          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }

        res.render('./shop/cart', { path: '/cart', docTitle: 'Cart | Node EN', cartProducts: cartProducts });
      })
      .catch((error) => {
        console.log('Error reading Products from DB: ', error);
      });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
    res.render('./shop/cart', { path: '/cart', docTitle: 'Cart | Node EN' });
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
