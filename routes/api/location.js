var express = require('express');
var router = express.Router();

/**
 * @api {post} /api/location Create location
 * @apiName PostLocation
 * @apiGroup Locations
 * @apiDescription Create a location
 * @apiParam {String} latitude
 * @apiParam {String} longitude
 * @apiParam {String} [name]
*/
router.post('/', function(req, res, next) {
  Location.create(req.body, function(err, post) {
    if (err)
      return next(err);
    res.json(post);
  });
});

module.exports = router;