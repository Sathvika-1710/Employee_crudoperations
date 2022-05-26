const mongoose=require('mongoose')
var employeeSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:'this field is required'
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
       type:String
    }
});
mongoose.model('Employees',employeeSchema)