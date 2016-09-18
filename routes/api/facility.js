var express = require('express');
var router = express.Router();

var Facility = require('../../models/Facility');

router.post('/', function(req, res, next) {
  Facility.create(req.body, function(err, post) {
    if (err)
      return next(err);
    res.json(post);
  });
});

router.get('/', function(req, res, next) {
  Facility.find()
    .populate('location')
    .exec(function(err, post) {
      res.json(post);
    });
});

module.exports = router;