var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Agronomist = require('../../models/Agronomist');

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
    Agronomist.collection.stats(function (err, stats) {
      res.json({
        dbStatus: mongoose.connection.readyState,
        agronomistStats: stats,
        message: 'API Root'
      });
    });
});

router.use('/test', require('./test'));
router.use('/agronomist', require('./agronomist'));

module.exports = router;
