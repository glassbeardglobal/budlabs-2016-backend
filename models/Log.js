var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var LogSchema = new mongoose.Schema({
  /*photos: [{ type: ObjectId, ref: 'Photo' }],*/
  description: { type: String },
  location: { type: ObjectId, ref: 'Location' }
},{
  timestamps: true
});

Log = mongoose.model('Log', LogSchema);

module.exports = Log;
