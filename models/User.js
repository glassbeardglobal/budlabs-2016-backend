var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
  agronomist: { type: Boolean, default: false },
  email: { type: String, unique: true, required: true, dropDups: true },
  name: { type: String, required: true },
  password: { type: String },
  location: { type: ObjectId, ref: 'Location' },
  contracts: [{ type: ObjectId, ref: 'Contract' }]
},
{
  timestamps: true
});

User = mongoose.model('User', UserSchema);

module.exports = User;
