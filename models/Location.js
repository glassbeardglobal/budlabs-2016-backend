var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.types.ObjectId;

var LocationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitutde: { type: Number, required: true },
  name: { type: String }
},{
  timestamps: true
});
