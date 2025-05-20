const express = require("express");
const app = express();
const port =8080;
const path = require("path");
const {v4 : uuidv4} = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"/public")));

let posts = [{
  id :uuidv4(),
  username : "Enterpreneur",
  content : "Learning to take risk and succeed"
}, 
{
  id : uuidv4(),
  username : "Krishna Enterprises",
  content : "Quality is what matters to us"
},
{
  id : uuidv4(),
  username : "Customers",
  content : "Nice servicces provided"}  
];

app.get("/posts" , (req,res)=>{
  res.render("index",{posts});
})
app.get("/posts/new",(req,res)=>{
  res.render("form");
})
app.post("/posts",(req,res)=>{
  let {username , content} = req.body;
  let id = uuidv4()
  posts.push({id, username , content});
  res.redirect("/posts");
})

app.get("/posts/:id" , (req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=>id===p.id);
  res.render("show",{post});
})
app.patch("/posts/:id" , (req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=>id===p.id);
  let newContent = req.body.newContent;
  post.content = newContent;
  res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=>id===p.id);
  res.render("edit.ejs",{post});
})
app.delete("/posts/:id", (req,res)=>{
  let {id} = req.params;
  posts = posts.filter((p)=>id !== p.id);
  res.redirect("/posts");
})
app.listen(port , () =>{
  console.log("listening..");
})



