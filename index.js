//npm i express cors mongoose body-parser dotenv ejs 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const studentModal = require("./modals/studentData");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));
// database
mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.get("/event-attendance",(req, res)=>{
    let id = req.query.id;
    studentModal.find({id:id})
    .then((data)=>{
        if(data.length == 0){res.render("fail",{data : " fetch data"});}
        else{
            res.render("index",data[0])
        }
    }
    )
    .catch((err)=>console.log(err));
    ;
});

app.get("/addData",(req,res)=>{
    // Name, roll no., Email, contact no
    // const {name,rollNo,email,contactNo} = req.body
  res.render('submit')
});
app.post("/addData",(req,res)=>{
    // Name, roll no., Email, contact no
    const {name,rollNo,email,contactNo,id} = req.body
    console.log(req.body);
    let newStudent = new studentModal({name:name,rollNo:rollNo,email:email,contactNo:contactNo,id:id});
    newStudent.save((err,data)=>{
        if(!err){
            res.render('sucess',{name:name,rollNo:rollNo,email:email,contactNo:contactNo})
        }
        else{
            res.render("fail",{data : " save data"});
            console.log(err);
        }
    })
    
});
// app.get("/")
app.listen(port, () => console.log(`running on port ${port}`));
