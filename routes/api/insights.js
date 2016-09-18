var express = require('express');
var router = express.Router();

var Log = require('../../models/Log');

router.get('/logs', function(req, res, next) {
  Log.find(function(err, post) {
    if (err)
      return next(err);
    res.json(post);
  });
});

module.exports = router;