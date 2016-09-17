var express = require('express');
var router = express.Router();
var utils = require('../../helpers/utils');

var User = require('../../models/User');
var Contract = require('../../models/Contract');

router.use(utils.getId);

/**
 * @api {get} /api/contracts Get Current Contracts
 * @apiName GetContracts
 * @apiGroup Contacts
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

router.post('/', function(req, res, next) {
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

module.exports = router;
