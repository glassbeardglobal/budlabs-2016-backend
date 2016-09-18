var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var LogSchema = new mongoose.Schema({
  /*photos: [{ type: ObjectId, ref: 'Photo' }],*/
  description: { type: String },
  location: { type: ObjectId, ref: 'Location' },
  yield_rate: { type: Number, default: -1 },
  yield: { type: Number, default: -1 },
  red_flags: { type: Boolean, default: false },
  pests: { type: Boolean, default: false },
  hail: { type: Boolean, default: false },
  lodging: { type: Boolean, default: false },
  discoloration: { type: Boolean, default: false },
  disease: { type: Boolean, default: false },
  other: { type: String }
},{
  timestamps: true
});

Log = mongoose.model('Log', LogSchema);

module.exports = Log;
