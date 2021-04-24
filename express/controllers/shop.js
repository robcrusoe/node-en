const Product = require('./../models/product');
const Cart = require('./../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('./shop/product-list', {
      prods: products,
      docTitle: 'Products | Node EN',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log('prodId [shopController]: ', prodId);

  Product.findById(prodId, (product) => {
    console.log('product [shopController]: ', product);

    res.render('./shop/product-detail', { path: '/products', docTitle: product.title + ' | Node EN', product: product });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('./shop/index', {
      prods: products,
      docTitle: 'Shop | Node EN',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find((prod) => prod.id === product.id);

        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }

      res.render('./shop/cart', { path: '/cart', docTitle: 'Cart | Node EN', cartProducts: cartProducts });
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
