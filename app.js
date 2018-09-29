var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8081;

var routes = require('./routes/routes');
routes(app);
// var posts = require('./src/posts');
// posts(app);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');

app.listen(port, () => console.log('API listening on port ' + port))
