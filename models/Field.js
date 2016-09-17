var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var FieldSchema = new mongoose.Schema({
  location: { type: ObjectId, ref: 'Location' },
  name: { type: String },
  logs: [{ type: ObjectId, ref: 'Log' }]
},{
  timestamps: true
});

Field = mongoose.model('Field', FieldSchema);

module.exports = Field;
