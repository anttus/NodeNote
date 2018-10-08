# NodeNote
### A shopping list web app

Built with:
* Node.js
* Express
* jQuery
* Bootstrap
* Firebase
* MariaDB

By @anttus & @mkotkav

## Rest API documentation:

Lists:<br/>
- *Get list by id: * <br/> GET /api/lists/LIST_ID
- *Get user by id: * <br/> GET /api/lists?userId=USER_ID
- *Insert list: *  <br/> PUT /api/lists?userId=USER_ID&listName=LIST_§NAME
- *Insert user: * <br/> PUT /api/lists/user?email=EMAIL&listId=LIST_ID
- *Update list name: * <br/> PATCH /api/lists?listId=LIST_ID&newName=NEW_NAME
- *Remove list: * <br/> DELETE /api/lists/LIST_ID

Items:<br/>
- *Get items by list id: * <br/> GET /api/items?listId=LIST_ID
- *Insert item: * <br/> PUT /api/items?name=ITEM_NAME&list_id=LIST_ID
- *Update item name: * <br/> PATCH /ap/items?itemId=ITEM_ID&newName=NEW_NAME
- *Update item status: * <br/> PATCH /api/items/status?itemId=ITEM_ID&completed=1/0
- *Remove item: * <br/> DELETE /api/items?listId=LIST_ID&itemId=ITEM_ID

Users:<br/>
- *Get all users: * <br/> GET /api/users
- *Insert user: * <br/> PUT /api/users?userId=USER_ID&email=EMAIL
- *Remove user: * <br/> DELETE /api/users?userId=USER_ID
