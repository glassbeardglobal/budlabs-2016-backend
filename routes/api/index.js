var express = require('express');
var router = express.Router();

var User = require('../../models/User.js');

/**
 * @api {get} /api/ Get API Status
 * @apiName GetStatus
 * @apiGroup Index
 * @apiDescription Get the current status of the database
*/
router.get('/', function(req, res, next) {
  if (mongoose.connection.readyState === 0) {
    res.json({
      dbStatus: mongoose.connection.readyState,
      message: 'API Root'
    });
  }
  else
    User.collection.stats(function (err, stats) {
      res.json({
        dbStatus: mongoose.connection.readyState,
        dbStats: stats,
        message: 'API Root'
      });
    });
});

router.use('/test', require('./test'));
router.use('/users', require('./users'));

module.exports = router;
