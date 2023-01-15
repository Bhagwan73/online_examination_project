const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        trim:true
    },
    lastName:{
        type:String,
        require:true,
        trim:true
    },
    mobile:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true  
    },
    password:{
        type:String,
        require:true,
        trim:true
    }
},{timestamps:true})
module.exports=mongoose.model("User",userSchema)