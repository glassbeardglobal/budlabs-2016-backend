var express = require('express');
var router = express.Router();

var Log = require('../../models/Log');
var Field = require('../../models/Field');

/**
 * @api {post} /api/logs Create a new log
 * @apiName PostLog
 * @apiGroup Logs
 * @apiDescription Create a new log by providing the field
 * @apiParam {String} field Field id for log to be placed in
 * @apiParam {String} description
*/
router.post('/', function(req, res, next) {
  if (req.body.field === undefined)
    res.json({
      "success": false,
      "message": "Field field must be defined"
    });
  else {
    Field.findById(req.body.field, function(err, f) {
      if (err)
        return next(err);
      Log.create(req.body, function(err, post) {
        if (err)
          return next(err);
        Field.findByIdAndUpdate(req.body.field, { $push: post._id }, function(err, t) {
          if (err)
            return next(err);
          res.json({
            "success": true,
            "log": post
          });
        });
      });
    });
  }
});

/**
 * @api {get} /api/logs/:id Get a log
 * @apiName GetLog
 * @apiGroup Logs
 * @apiDescription Retrieve a log
*/
router.get('/:id', function(req, res, next) {
  Log.findById(req.params.id, function(err, post) {
    if (err)
      return next(err);
    res.json(post);
  });
});

module.exports = router;
