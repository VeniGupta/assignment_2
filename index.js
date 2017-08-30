var express =require("express");
var app =express();
var bodyParser = require("body-parser");
var todo_db= require("./seed.js");
app.use("/", function(req, res, next){
    console.log("Request");
    console.log(req.url);
    console.log(req.method);

    next();
});
app.use("/", express.static(__dirname+"/public"));
app.use("/", bodyParser.urlencoded({extended:false}) );
app.get("/api/todos", function( req,res)
{
    res.json(todo_db.todos);
});

app.delete("/api/todos/:id", function(req,res)
{

    var del_id = req.params.id;
    var todo = todo_db.todos[del_id];
    if(!todo)
    {
        res.status(400).json({error :"TODO doesn't exists"});

    }
    else
    {
        todo.status = todo_db.StatusEnums.DELETED;
        res.json(todo_db);
    }


});
app.post("/api/todos", function (req,res)
{
    var todo = req.body.todo_title;
    if(!todo || todo === " "|| todo.trim() === " ")
    {
        res.status(400).json({error :"TODO title can't be empty"});
    }
    else
    {
     var new_todo_object={
         title: req.body.todo_title,
         status: todo_db.StatusEnums.ACTIVE
     }
     todo_db.todos[todo_db.next_todo_id]= new_todo_object;
     todo_db.next_todo_id =todo_db.next_todo_id+1;
     res.json(todo_db.todos);
    }
}
);

app.put("/api/todos/:id", function(req, res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];
    if (!todo) {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else {
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title!="" && todo_title.trim()!=""){
            todo.title = todo_title;
       }

        var todo_status = req.body.todo_status;

        if(todo_status &&
            (todo_status == todo_db.StatusEnums.ACTIVE ||
                todo_status== todo_db.StatusEnums.COMPLETE )
        ) {
            todo.status = todo_status;
        }

        res.json(todo_db.todos);
    }


});

app.get("/api/todos/active", function(req, res) {
   var i;
   var db ={};

for (i in todo_db.todos)
    {
        var todo = todo_db.todos[i];
       if( todo.status === todo_db.StatusEnums.ACTIVE) {
           db[i]=todo;
       }
    }
res.json(db);
});
app.get("/api/todos/complete", function(req, res) {
    var i;
    var db ={};

    for (i in todo_db.todos)
    {
        var todo = todo_db.todos[i];
        if( todo.status === todo_db.StatusEnums.COMPLETE) {
            db[i]=todo;
        }
    }
    res.json(db);
});
app.get("/api/todos/delete", function(req, res) {
    var i;
    var db ={};

    for (i in todo_db.todos)
    {
        var todo = todo_db.todos[i];
        if( todo.status === todo_db.StatusEnums.DELETED) {
            db[i]=todo;
        }
    }
    res.json(db);
});
//console.log(todo_db);
app.put("/api/todos/complete/:id", function(req, res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];
    if (!todo) {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else {
        todo.status = todo_db.StatusEnums.COMPLETE;
        res.json(todo_db.todos);
    }


});
app.put("/api/todos/active/:id", function(req, res) {



    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];
    if (!todo) {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else {
        todo.status = todo_db.StatusEnums.ACTIVE;
        res.json(todo_db.todos);
    }
});
app.listen(4200);