var utils = {
  getId: function(req, res, next) {
    var id = req.body.id || req.query.id;
    if (id == undefined)
      res.json({
        "success": false,
        "message": "User id was not provided and is required for this route"
      });
    User.findById(id, function(err, post) {
      req.user = post;
      next();
    });
  }
}

module.exports = utils
