var express    = require( 'express' ),
    session    = require( 'express-session' ),
    cookieParser = require( 'cookie-parser' ),
    bodyParser = require( 'body-parser' ),
    mongoose   = require( 'mongoose' ),
    passport   = require( 'passport' ),
    yarm       = require( 'yarm' ),
    app        = express();

var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/dx';
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to database: " + mongoUri);
});

require( './app/server/config/passport.js' )(passport);

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/app/public/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/app/public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session( {
  secret: 'aelska-dX'
} ));
app.use(passport.initialize());
app.use(passport.session());
app.use("/rest", yarm());

require( './app/server/router.js' )(app);
require( './app/server/yarm.js' );

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
