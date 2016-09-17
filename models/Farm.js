var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var FarmSchema = new mongoose.Schema({
  latitude: { type: Number },
  longitude: { type: Number }
},{
  timestamps: true
});

Farm = mongoose.model('Farm', FarmSchema);

module.exports = User;
