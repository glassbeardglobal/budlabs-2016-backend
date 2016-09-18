var express = require('express');
var router = express.Router();
var utils = require('../../helpers/utils');

var User = require('../../models/User');
var Contract = require('../../models/Contract');

router.use(utils.getId);

/**
 * @api {get} /api/contracts Get Current Contracts
 * @apiName GetContracts
 * @apiGroup Contracts
 * @apiDescription Get current contracts for this user.
 *   This route requires an id
*/
router.get('/', function(req, res, next) {
  User.findById(req.user._id)
    .populate('contracts')
    .exec(function(err, post) {
      if (err) return next(err);
      res.json(post.contracts);
    });
});

/**
 * @api {post} /api/contracts Create new contract
 * @apiName PostContracts
 * @apiGroup Contracts
 * @apiDescription Create a new contract for the current user
 *   This route requires an id
 * @apiParam {String} name
 * @apiParam {String} [entity]
 * @apiParam {String} [phone]
 * @apiParam {String} [address]
*/
router.post('/', function(req, res, next) {
  req.body.agronomist = req.user._id;
  Contract.create(req.body, function(err, post) {
    if (err)
      res.json({
        "created": false,
        "message": err
      });
    else {
      User.findByIdAndUpdate(req.user._id, { $push: { 'contracts': post._id }}, function(err, next) {
        if (err)
          return next(err);
        res.json({
          "created": true
        });
      });
    }
  });
});

/**
 * @api {get} /api/contracs/fields/:id Get Fields for Contract
 * @apiName GetFields
 * @apiGroup Contracts
 * @apiDescription Get fields for a given contract
*/
router.get('/fields/:id', function(req, res, next) {
  Contract.findById(req.params.id)
    .populate('fields')
    .exec(function(err, post) {
      if (err) return next(err);
      res.json(post.fields);
    });
})

module.exports = router;
