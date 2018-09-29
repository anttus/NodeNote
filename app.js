const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;

const basicAuth = require('express-basic-auth')
app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}));

const routes = require('./routes/routes');
routes(app);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');

app.listen(port, () => console.log('API listening on port ' + port))
