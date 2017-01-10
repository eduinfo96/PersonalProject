var Showtimes = require('showtimes');

module.exports = {
  findByZip: function (req, res) {
    var api = new Showtimes(req.query.zip, {});
    api.getTheaters(function (error, theaters) {
      if (error) {
        return res.status(500).json(error)
      }
      console.log( theaters )

      return res.status(200).json(theaters);
    });
  }
}
