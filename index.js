var express = require('express');
var app = express();

// var mongoUri = process.env.MONGOLAB_URI ||
//     process.env.MONGOHQ_URL ||
//     'mongodb://localhost/node-login';

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/app/public/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/app/public'));


require('./app/server/router')(app);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
