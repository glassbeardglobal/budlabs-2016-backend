var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var LocationSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  name: { type: String }
},{
  timestamps: true
});

var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;
