const Product = require('../models/product');

exports.getAddProducts = (req,res,next) => {
    res.render('admin/edit-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProducts = (req,res,next) => {
    const product = new Product(req.body.title);
    //console.log("body:" + req.body.title);
    product.save();
    res.redirect('/');
} 


exports.getEditProducts = (req,res,next) => {
    res.render('admin/edit-product',{
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.getProducts = (req,res,next) => {
    Product.fetchAll(products => {
        res.render('shop/products-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
    
}