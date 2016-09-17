var utils = {
  getId: function(req, res, next) {
    var id = req.body.id || req.query.id;
    if (id == undefined)
      res.json({
        "success": false,
        "message": "User id was not provided and is required for this route"
      });
    req.id = id;
    next();
  }
}

module.exports = utils
