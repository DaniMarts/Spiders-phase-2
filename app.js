var express = require('express');
var todoController = require('./controllers/todoController');

//creating an express app
var app = express();

//setting the template engine to ejs
app.set('view engine', 'ejs');

//serving static files
app.use(express.static('./public'));

//activating the controller
todoController(app);

//listen to port
app.listen(3000);



