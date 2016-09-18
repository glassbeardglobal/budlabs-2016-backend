var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var FacilitySchema = new mongoose.Schema({
  location: { type: ObjectId, ref: 'Location' },
  name: { type: String }
},{
  timestamps: true
});

Facility = mongoose.model('Facility', FacilitySchema);

module.exports = Facility;
