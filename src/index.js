//console.log("test");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
// const books = [{title: 'Harry Potter', id: 1},
// {title: 'Twilight', id: 2},
// {title: 'Lorien Legacies', id: 3}];
const toDoList = [
    {
    id: 1,
    title: "Buy Apple",
    completed: false,
    createdOn: '08/08/2023',
  }];

const app = express();
app.use(helmet());
app.use(bodyParser.json());

//Get whole data
app.get("/", (req,res)=>{res.send(toDoList)});

//Get specific data with ID
app.get("/to-do-list/:id",(req,res)=>{
    const listItemById = toDoList.find(item => item.id == req.params.id);
    console.log(listItemById);
    if(!listItemById) {
        res.status(404).send("No TO-DO list item with ID: "+req.params.id);
    }
    res.send(listItemById)
});
//Add data 
app.post("/add-item",(req,res) =>{
    const newItem = {
        id : toDoList.length +1,
        title: req.body.title,
        completed: req.body.completed == undefined ? false: req.body.completed,
        createdOn: new Date().toLocaleDateString()
    };
    toDoList.push(newItem);
    res.send(toDoList);
});

//Edit data
app.post("/edit-item",(req,res) =>{
    if(req.body.id == undefined) {
        res.status(404).send("Please enter an item ID to edit");
    }
    const itemIndex = toDoList.findIndex(item => item.id == req.body.id);
    if(itemIndex === -1) {
        res.status(404).send("Item with ID: " +req.body.id+ " not found");
    }
    toDoList[itemIndex].completed = req.body.completed == undefined ? toDoList[itemIndex].completed : req.body.completed ;
    toDoList[itemIndex].title = req.body.title == undefined ? toDoList[itemIndex].title : req.body.title ;
    res.send(toDoList);
});

//Delete data
app.post("/delete-item",(req,res) =>{
    if(req.body.id == undefined) {
        res.status(404).send("Please enter an item ID to delete");
    }
    console.log(req.body.id);
    const itemIndex = toDoList.findIndex(item => item.id == req.body.id);
    if(itemIndex === -1) {
        res.status(404).send("Item with ID: " +req.body.id+ " not found");
    }
    console.log(itemIndex);
    toDoList.splice(itemIndex,1);
    res.send(toDoList);
});
app.listen(3030,()=>{console.log("running on port 3030")});