var express      = require( 'express' ),
    session      = require( 'express-session' ),
    cookieParser = require( 'cookie-parser' ),
    bodyParser   = require( 'body-parser' ),
    mongoose     = require( 'mongoose' ),
    passport     = require( 'passport' ),
    yarm         = require( 'yarm' ),
    app          = express();

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

//app.set('client-url','http://localhost:8080');
app.set('client-google-signin','/google?action=signin');
//app.disable('x-powered-by');

app.use(express.static(__dirname + '/app/public'));
app.use(bodyParser());
app.use(cookieParser());
app.use(session( {
  secret: 'aelska-dX'
} ));


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if ('OPTIONS' == req.method) {
        res.send(200);
    }else {
        next();
    }
};
app.use(allowCrossDomain);

app.use(passport.initialize());
app.use(passport.session());
app.use("/rest", yarm());

require( './app/server/router.js' )(app, passport);
require( './app/server/yarm.js' );

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
