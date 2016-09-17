var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ContractSchema = new mongoose.Schema({
  name: { type: String},
  entity: { type: String }
},
{
  timestamps: true
});

Contract = mongoose.model('Contract', ContractSchema);

module.exports = Contract;
