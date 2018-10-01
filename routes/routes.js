'use strict';
const basicAuth = require('express-basic-auth')


module.exports = function(app) {
    const controller = require('./controllers/restController');

    app.route('/')
    .get(controller.load_index);

    app.use(basicAuth({
        users: { 'rest.api': 'supersecret123' }
    }));

    // /api/lists?ownerId=<OWNER_ID>
    app.route('/api/lists')
    .get(controller.all_lists_of_user);

    // /api/lists/<LIST_ID>
    app.route('/api/lists/:id')
    .get(controller.list_by_id)
    .put(controller.create_list)
    .delete(controller.delete_list);

    // GET /api/items?listId=<LIST_ID>
    // PUT /api/items?name=<ITEM_NAME>&list_id=<LIST_ID>
    // DELETE /api/items?listId=<LIST_ID>&itemId=<ITEM_ID>
    app.route('/api/items')
    .get(controller.all_items_of_list)
    .put(controller.add_item)
    .delete(controller.delete_item);

    app.route('api/users')
    .put(controller.add_user)
    .delete(controller.delete_user);

};
