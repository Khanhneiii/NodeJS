const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
      res.render('shop/product-list' ,{
      prods: products,
      pageTitle: 'All products',
      path: '/products'
    })
  })
  .catch(err => console.log(err));
  
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/index' ,{
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
  .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
            cartProducts.push({productData: product,Qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    })
  });
};

exports.postCartDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      console.log(product.id);
      console.log(prodId);
      Cart.deleteProduct(product.id, product.price);
      res.redirect('/cart');
    })
}

exports.postCart = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId,(product) => {
    Cart.addProduct(prodId,product.price);
  })
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.getProduct = (req,res,next) => {
  const prodID = req.params.productId;
  Product.findByPk(prodID)
   .then((product) => {
    res.render('shop/product-detail',
    {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.log(err));
}