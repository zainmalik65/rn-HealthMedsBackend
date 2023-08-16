const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sizeScheema=new Schema({
  size:{
    type:String,
    required:true
  }
});
const colorScheema=new Schema({
  color:{
    type:String,
    required:true
  }
});
const flavorScheema=new Schema({
  flavor:{
    type:String,
    required:true
  }
});


const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  percentageOff: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false
  },
  quantity: {
    type: String,
    required: true
  },
  image: {
    type: String,
    // required: true
  },
  sizes: [{ 
    size: String }]
  ,
  colors: [{ 
    color: String }]
  ,
  flavours: [{ 
    flavour: String }]
  ,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
});

module.exports = mongoose.model('Product', productSchema);


