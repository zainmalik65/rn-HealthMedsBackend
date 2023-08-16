const Product = require('../models/product');
const Order = require('../models/order');
const { validationResult } = require('express-validator/check');




exports.createProuct = (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  
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
  const type=req.body.type;
  const quantity=req.body.quantity;
  const percentageOff=100 * (price - discountPrice) / price;
  let productSizes=[];
  if(req.body.sizes){
    req.body.sizes.forEach((size,index) => {
        productSizes.push({id:index,size:size})
    });
  }
  let productColors=[];
  if(req.body.colors){
    req.body.colors.forEach((color,index) => {
      productColors.push({id:index,color:color})
    });
  }
  let productFlavours=[];
  if(req.body.flavours){
    req.body.flavours.forEach((flavor,index) => {
      productFlavours.push({id:index,flavour:flavor})
    });
  }
  const product = new Product({
    name: name,
    price: price,
    discountPrice:discountPrice,
    image:imageUrl,
    manufacturer:manufacturer,
    type:type,
    brand:brand,
    percentageOff:percentageOff,
    quantity:quantity,
    sizes:productSizes,
    colors:productColors,
    flavours:productFlavours
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



exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;

  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const updateddiscountPrice = req.body.discountPrice;
  const UpdatedManufacturer = req.body.manufacturer;
  const updatedBrand = req.body.brand;
  const updatedtype=req.body.type;
  const updatedPercentageOff=100 * (updatedPrice - updateddiscountPrice) / updatedPrice;
  let updatedimageUrl;
  if(req.file){
    updatedimageUrl = req.file.path;
  }

  Product.findById(prodId)
    .then(product => {
      console.log('prrr',product)
      if(product){
      product.name=updatedName;
      product.price= updatedPrice;
      product.discountPrice=updateddiscountPrice;
      product.manufacturer=UpdatedManufacturer;
      product.brand=updatedBrand;
      product.percentageOff=updatedPercentageOff;
      type=updatedtype;
      if(updatedimageUrl){
        product.image=updatedimageUrl
      }
      console.log('prrr',product)
      return product.save().then(result => {
        res.status(201).json({
          message: 'Product updated successfully!',
          success:true,
          product:product
        });
      });
      }
      else{
        res.status(201).json({
          message: 'Product not found!',
          success:false
        });
      }
      
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

exports.getOrders = (req, res, next) => {
  Order.find()
    .then(orders => {
       res.status(201).json({
        message: 'Order retrived successfully',
        success:true,
        orders:orders
    })
    })
    .catch(err => console.log(err));
};
