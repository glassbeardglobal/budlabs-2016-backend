var express = require('express');
var router = express.Router();

var Field = require('../../models/Field');

var User = require('../../models/User');
var Contract = require('../../models/Contract');

/**
 * @api {post} /api/fields Create a new field
 * @apiName PostField
 * @apiGroup Fields
 * @apiDescription Create a new field by providing the contract
 * @apiParam {String} contract Contract id for field to be placed in
 * @apiParam {String} name
 * @apiParam {String} [entity]
 * @apiParam {String} [phone]
 * @apiParam {String} [address]
*/
router.post('/', function(req, res, next) {
  if (req.body.contract === undefined) {
    res.json({
      "success": false,
      "message": "Contract id must be provided"
    });
  }
  else
    Contract.findById(req.body.contract, function(err, ct) {
      if (err)
        return next(err);
      Field.create(req.body, function(err, f) {
        if (err)
          return next(err);
        Contract.findByIdAndUpdate(req.body.contract, { $push: { fields: f._id } }, function(err, post) {
          res.json({
            "success": true
          });
        });
      });
    });
});

/**
 * @api {get} /api/fields/:id Get Field
 * @apiName GetField
 * @apiGroup Fields
 * @apiDescription Get field by id
*/
router.get('/:id', function(req, res, next) {
  Field.findById(req.params.id, function(err, post) {
    if (err)
      return next(err);
    res.json(post);
  });
});

/**
 * @api {get} /api/fields/logs/:id Get Field Logs
 * @apiName GetFieldLogs
 * @apiGroup Fields
 * @apiDescription Get field by id and return logs associated
*/
router.get('/logs/:id', function(req, res, next) {
  Field.findById(req.params.id)
    .populate('logs')
    .exec(function(err, post) {
      if (err) return next(err);
      res.json(post.logs);
    });
});

module.exports = router;
