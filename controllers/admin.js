const Product = require('../models/product');
const { validationResult } = require('express-validator/check');
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log('[rr',req.body);
 
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.createProuct = (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  console.log('req',req.body);
  if (!req.file) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const name = req.body.name;
  const price = req.body.price;
  const discountPrice = req.body.discountPrice;
  const manufacturer = req.body.manufacturer;
  const brand = req.body.brand;
  const percentageOff=100 * (price - discountPrice) / price
  const product = new Product({
    name: name,
    price: price,
    discountPrice:discountPrice,
    image:imageUrl,
    manufacturer:manufacturer,
    brand:brand,
    percentageOff:percentageOff,
    // userId: req.user
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Product created successfully!',
       product:product});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save().then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {

  Product.find()
  .then(products => {
    res.status(201).json({
      message: 'Products Retrived successfully!',
      products:products
      });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId})
    .then(() => {
      res.status(201).json({
        message: 'Products Deleted successfully!',
        });
    })
    .catch(err => console.log(err));
};
