const mongoose=require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/EmployeeDB',{useNewUrlParser:true},(err,db)=>{
    if(!err){
        console.log("connection is successful");
        module.exports=db;
    }
    else{
        console.log(err);
    }
})
require('./employee.models.js')
