const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const port = 3000;
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workList = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  const day = date.getDate();
  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){
  console.log(req.body);
  item = req.body.newItem;

  if(req.body.list === "Work"){

    workList.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workList});
});

app.listen(port, function(){
  console.log("Server has started on port: " + port);
});
