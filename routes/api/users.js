var express = require('express');
var router = express.Router();
var utils = require('../../helpers/utils');

var User = require('../../models/User');

/**
 * @api {get} /api/users Get User List
 * @apiName GetUsers
 * @apiGroup Users
 * @apiDescription Get the list of all users
*/
router.get('/', function(req, res, next) {
  User.find(function(err, users) {
    if (err)
      next(err);
    else
      res.json(users);
  });
});

/**
 * @api {post} /api/users Create User
 * @apiName CreateUser
 * @apiGroup Users
 * @apiDescription Create a User
 * @apiParam {String} email
 * @apiParam {String} [name]
 * @apiParam {String} [password]
*/
router.post('/', function(req, res, next) {
  User.create(req.body, function(err, post) {
    if (err) {
      res.json({
        "created": false,
        "message": err
      });
    } else {
      res.json({
        "created": true,
        "user": post
      });
    }
  });
});

/**
 * @api {get} /api/users/:id Get Specific User
 * @apiName GetUser
 * @apiGroup Users
 * @apiDescription Get a single User by providing the id
 * @apiExample Example Usage:
 *   http://barleynet.herokuapp.com/api/user/8eb2301ff3265
*/
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, post) {
    if (err) {
      err.status = 400;
      return next(err);
    }
    else
      res.json(post);
  });
});

router.delete('/:id', function(req, res, next) {
  User.remove( { _id: req.params.id }, function(err, val) {
    if (err)
      return next(err);
    res.json({
      "success": true
    });
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