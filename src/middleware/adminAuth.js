const {isValidObjectId}=require("mongoose")
const {verify}=require("jsonwebtoken")
const adminModel = require("../model/adminModel")

//   ---------------------------|| AUTHENTICATION ||--------------------------------------

exports.authentication=(req,res,next)=>{
    try{
    let token=req.headers.authorisation
    if(!token) return res.status(401).send({status:false,message:"token is mandatory"})
    token=token.slice(7)  //because we use barear token
    verify(token,`${process.env.ADMIN_SEC}` ,(err,decodedToken)=>{
        if(err) return res.status(400).send({status:false,message:err.message})
        req.id=decodedToken.adminId
        next()
    })
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

//   ---------------------------|| AUTHORISATION ||--------------------------------------

exports.authorisation=async (req,res,next)=>{
    try{
    const {adminId}=req.params
    if(!isValidObjectId(adminId)){
        return res.status(400).send({status:false,message:"please provide the valid adminid"})
    }
    let admin=await adminModel.findById(adminId)
    if(!admin) return res.status(404).send({status:false,message:"this admin is not exists"})
    if(req.id!=adminId) return res.status(403).send({status:false,message:"only admin can do this operation"})
    next()
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}