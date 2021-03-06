module.exports = function(io) {
  var express = require('express');
  var router = express.Router();
  var mongoose = require('mongoose');

  var User = require('../../models/User');
  var Location = require('../../models/Location');

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
          userStats: stats,
          message: 'API Root'
        });
      });
  });

  router.use('/test', require('./test'));
  router.use('/users', require('./users'));
  router.use('/contracts', require('./contracts'));
  router.use('/fields', require('./fields'));
  router.use('/logs', require('./logs')(io));
  router.use('/insights', require('./insights'));
  router.use('/location', require('./location'));
  router.use('/facility', require('./facility'));

  return router;
}
