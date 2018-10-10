const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const routes = require('./routes/routes');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "/public")));
app.use('/scripts', express.static(__dirname + '/node_modules/jquery-validation/dist/'));
app.use('/scripts', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use('/scripts', express.static(__dirname + '/login/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');

app.listen(port, () => console.log('API listening on port ' + port))

routes(app);
