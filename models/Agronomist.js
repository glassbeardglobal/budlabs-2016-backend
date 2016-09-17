var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var AgronomistSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, dropDups: true },
  name: { type: String, required: true },
  password: { type: String },
  location: { type: ObjectId, ref: 'Location' },
  contracts: [{ type: ObjectId, ref: 'Contract' }]
},
{
  timestamps: true
});

Agronomist = mongoose.model('Agronomist', AgronomistSchema);

module.exports = Agronomist;
