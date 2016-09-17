var express = require('express');
var router = express.Router();
var utils = require('../../helpers/utils');

var Agronomist = require('../../models/Agronomist');

/**
 * @api {get} /api/agronomist Get Agronomist List
 * @apiName GetAgronomists
 * @apiGroup Agronomist
 * @apiDescription Get the list of all agronomists
*/
router.get('/', function(req, res, next) {
  Agronomist.find(function(err, users) {
    if (err)
      next(err);
    else
      res.json(users);
  });
});

/**
 * @api {post} /api/agronomist Create Agronomist
 * @apiName PostAgronomists
 * @apiGroup Agronomist
 * @apiDescription Create an Agronomist
 * @apiParam {String} email
 * @apiParam {String} [name]
 * @apiParam {String} [password]
*/
router.post('/', function(req, res, next) {
  Agronomist.create(req.body, function(err, post) {
    if (err) {
      res.json({
        "created": false,
        "message": err
      });
    } else {
      res.json({
        "created": true,
        "agronomist": post
      });
    }
  });
});

/**
 * @api {get} /api/agronomist/:id Get Specific Agronomist
 * @apiName GetAgronomist
 * @apiGroup Agronomist
 * @apiDescription Get a single Agronomist by providing the id
 * @apiExample Example Usage:
 *   http://barleynet.herokuapp.com/api/agronomist/8eb2301ff3265
*/
router.get('/:id', function(req, res, next) {
  Agronomist.findById(req.params.id, function(err, post) {
    if (err) {
      err.status = 400;
      return next(err);
    }
    else
      res.json(post);
  });
});

router.use(utils.getId);

// TODO
router.post('/edit', function(req, res, next) {
  res.json({
    "message": "Not implemented"
  });
});

module.exports = router;