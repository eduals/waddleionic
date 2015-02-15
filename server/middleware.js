var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var errorhandlers = require('./errorhandlers.js');

module.exports = function (app, express) {
	var userRouter = express.Router();
	var checkinRouter = express.Router();
  var placeRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static(path.join(__dirname, '../www')));

  app.use('/api/users', userRouter);
  app.use('/api/checkins', checkinRouter);
  app.use('/api/places', placeRouter);

  app.get('/fsqredirect', function(req, res) {
    res.sendfile(__dirname + '/static/foursquareredirect.html');
  });

  app.get('/instagramredirect', function(req, res) {
    res.sendfile(__dirname + '/static/instagramredirect.html');
  });

  app.use(errorhandlers.errorLogger);
  app.use(errorhandlers.errorHandler);

  require('./api/users/userRoutes.js')(userRouter);
	require('./api/checkins/checkinRoutes.js')(checkinRouter);
  require('./api/places/placeRoutes.js')(placeRouter);
};