var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    "message": "I love Shivani Patel"
  });
});

router.post('/', function(req, res, next) {
  res.json({
    "body": req.body,
    "message": "Bhangra My Surti"
  });
});

module.exports = router;