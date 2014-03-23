
/**
 * Module dependencies.
 */

var express = require('express')
  , home = require('./routes/index')
  , user = require('./routes/user')
  , button = require('./routes/button')
  , categories = require('./routes/categories')
  , http = require('http')
  , path = require('path');

var app = express();
_button = ""
_error = ""
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', home.home);
app.get('/btn/:bid', button.location);
app.get('/getcudos', button.generate);
app.post('/getcudos', button.generate_post);
app.get('/c/:category/:type', categories.index);
app.get('/u/:username', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
