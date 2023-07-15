const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
  name: {
      type: String,
      require:true
  },
  image: {
      data: Buffer,
      contentType: String
  }
});

const offerpropertySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Property',
    required: true
  },
  propertyType: {
    type: String,
    enum:['land', 'house'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  rooms: { //added
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  parkingSpace: {
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  kitchen: {
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  bedroom: {
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  diningRoom: {
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  hall: {
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  bathroom: {
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  noOfFloors: {
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  builtYear: {
    type: Number,
    required: true
  },
  usedArea: {
    type: Number,
    required: function(){
      return this.propertyType==='house'
    }
  },
  propertyImage: [ImageSchema]
}, {
  timestamps: true
});

const OfferProperty = mongoose.model('OfferProperty', offerpropertySchema);


module.exports = OfferProperty;