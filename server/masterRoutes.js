const userRoutes = require( "./Users/userRoutes.js" );


module.exports = app => {
  userRoutes(app);
}
