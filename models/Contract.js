var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ContractSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  entity: { type: String },
  phone: { type: String },
  address: { type: String },
  fields: [{ type: ObjectId, ref: 'Field' }],
  agronomist: { type: ObjectId, ref: 'User' }
},
{
  timestamps: true
});

Contract = mongoose.model('Contract', ContractSchema);

module.exports = Contract;
