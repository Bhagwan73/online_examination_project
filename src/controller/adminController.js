const adminModel = require("../model/adminModel")
const {isValidEmail,isValidPassword}=require("../validator/validator")
const {compare}=require("bcrypt")
const jwt=require("jsonwebtoken")
//   ---------------------------|| CREATE_ADMIN||--------------------------------------

exports.createAdmin=async (req,res)=>{
    try{
    let admin=await adminModel.create(req.body)
    return res.status(201).send({status:true,message:"admin created successfully",data:admin})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

//   ---------------------------|| LOGIN_ADMIN ||--------------------------------------

exports.loginAdmin=async (req,res)=>{
    try{
    const {email,password}=req.body
    if(!email) return res.status(400).send({status:false,message:"emailId is mandatory"})
    if(!isValidEmail(email)) return res.status(400).send({status:false,message:"please provide the valid emailId"})
    let admin=await adminModel.findOne({email})
    if(!admin) return res.status(404).send({status:false,message:"this emailId is not exists"})

    if(!password) return res.status(400).send({status:false,message:"password is mandatory"})
    if(!isValidPassword(password))  return res.status(400).send({status:false,message:"please provide the valid password"})
    let hashPassword=await compare(password,admin.password)
    if(!hashPassword) {
        return res.status(400).send({status:false,message:"incorrect password"})
    } 

    let token = jwt.sign({adminId:admin._id},`${process.env.ADMIN_SEC}`,{expiresIn:"1h"})
    res.setHeader("token",token)
    return res.status(200).send({status:true,message:"user login successfully"})
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

