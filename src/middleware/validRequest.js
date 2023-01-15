const {hash}=require("bcrypt")
const {isValidEmail,isValidName,isValidPassword,isValidString,isValidMobile}=require("../validator/validator")
const userModel=require("../model/userModel")
const adminModel = require("../model/adminModel")

//   ---------------------------|| VALIDATION_FOR_REQUEST ||--------------------------------------

exports.isValidReq=async (req,res,next)=>{
    try{
    const request=Object.keys(req.body)
    if(request.length==0) return res.status(400).send({status:false,message:"please provide data"})
    const itsMandatory=["firstName","lastName","mobile","email","password"]
    for (let i = 0; i < itsMandatory.length; i++) {
        const element = itsMandatory[i];
       if(!request.includes(element)){
        return res.status(400).send({status:false,message:`${element} is mandatory`})
       }
       if(element=="firstName"||element=="lastName"){
        if(!isValidName(req.body[element]) || !isValidString(req.body[element])){
        return res.status(400).send({status:false,message:`please provide the valid ${element} `})
        }
       }
    }
    
    const {mobile,email,password}=req.body
   
    if(mobile){
      if(!isValidMobile(mobile)) return res.status(400).send({status:false,message:`please provide the valid mobile number`})
      if(req.url=="/registerUser") {
        let isUniqueMobile=await userModel.findOne({mobile})
         if(isUniqueMobile) return res.status(400).send({status:false,message:`this number is already exists`})
    }else{
      let isUniqueMobile=await adminModel.findOne({mobile})
      if(isUniqueMobile) return res.status(400).send({status:false,message:`this number is already exists`})
    }
    }

    if(email){
        if(!isValidEmail(email)) return res.status(400).send({status:false,message:`please provide the valid emailId `})
        if(req.url=="/registerUser") {
        let isUniqueEmail=await userModel.findOne({email})
        if(isUniqueEmail) return res.status(400).send({status:false,message:`this email is already exists`})
        }else{
            let isUniqueEmail=await adminModel.findOne({email})
            if(isUniqueEmail) return res.status(400).send({status:false,message:`this email is already exists`}) 
        }
      }

    if(password){
        if(!isValidPassword(password)){
            return res.status(400).send({status:false,message:`please provide the valid and strong password`})
        }
         req.body.password=await hash(password,10)
    }
    next()
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}
 



