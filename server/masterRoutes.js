const userRoutes = require( "./Users/userRoutes.js" );
const theatersRoutes = require( "./Theaters/theatersRoutes.js" );


module.exports = app => {
  userRoutes(app);
  theatersRoutes(app);
}
