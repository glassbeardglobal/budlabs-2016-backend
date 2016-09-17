var express = require('express');
var router = express.Router();

/**
 * @api {get} /api/test Get test route
 * @apiName GetTest
 * @apiGroup Test
 * @apiDescription Send a test get request
*/
router.get('/', function(req, res, next) {
  res.json({
    "message": "I love Shivani Patel"
  });
});

/**
 * @api {post} /api/test Post test route
 * @apiName PostTest
 * @apiGroup Test
 * @apiDescription Send a post request to this test route
 * @apiParam {Object} message Whatever you want to send, this is a test route
*/
router.post('/', function(req, res, next) {
  res.json({
    "body": req.body,
    "message": "Bhangra My Surti"
  });
});

module.exports = router;