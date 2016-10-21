const theatersCtrl = require("./theatersCtrl.js");

module.exports= app => {
  app.get( '/api/movies', theatersCtrl.findByZip );
}
