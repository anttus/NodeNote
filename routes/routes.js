'use strict';

module.exports = function(app) {
    var controller = require('./controllers/restController');

    // app.route('/')
    // .get(controller.load_index);

    app.route('/api/lists/')
    .get()
    .post()

    app.route('/api/lists/:id')
    .get()
    .post()

    app.route('/api/items/')
    .get()
    .post()

    app.route('/api/items/:id')
    .get()
    .post()

};
