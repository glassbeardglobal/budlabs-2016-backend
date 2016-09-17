var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, dropDups: true },
  name: { type: String, required: true }
},
{
  timestamps: true
});

User = mongoose.model('User', UserSchema);

module.exports = User;
