var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var FieldSchema = new mongoose.Schema({
  location: { type: ObjectId, ref: 'Location' }
},{
  timestamps: true
});

Field = mongoose.model('Field', FieldSchema);

module.exports = User;
