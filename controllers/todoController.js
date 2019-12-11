var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connecting to database
mongoose.connect("mongodb+srv://test:test@todo-lpo5j.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model("Todo", todoSchema);

var urlEncodedParser = bodyParser.urlencoded({extended: false});
//var data = [{item: 'reactjs'}, {item: 'nodejs'}, {item: 'react native'}];

module.exports= (app)=>{

    app.get('/todo', (req, res)=>{
        //getting data from MongoDB adnd rednerign the data
        Todo.find({}, (err, data)=>{
            if (err) throw err;
            res.render('todo', {todos: data});
        });
        
    });

    app.post('/todo', urlEncodedParser, (req, res)=>{
        //getting data from the view and posting it to MongoDB
        Todo(req.body).save((err, data)=>{
            if (err) throw err;
            //refresing the page
            res.json({todos:data});
        });
        
    });

    app.delete('/todo/:item', (req, res)=>{
        var item =req.params.item.replace(/\-/g, ' ');
        Todo.find({item:item}).remove((err, data)=>{
            if (err) throw err;
            res.json({todos:data});
        });
       
        // data = data.filter(todo => {
        //     return todo.item.replace(/ /g, "-") !== req.params.item;
        // });
        // console.log(data);
        // res.json({todos:data});
    });
}