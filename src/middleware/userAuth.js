const {isValidObjectId}=require("mongoose")
const {verify}=require("jsonwebtoken")
const userModel = require("../model/userModel")

//   ---------------------------|| AUTHENTICATION ||--------------------------------------

exports.authenticationUser=(req,res,next)=>{
    try{
    let token=req.headers.authorisation
    if(!token) return res.status(401).send({status:false,message:"token is mandatory"})
    token=token.slice(7)  //because we use barear token
    verify(token,`${process.env.USER_SEC}` ,(err,decodedToken)=>{
        if(err) return res.status(400).send({status:false,message:err.message})
        req.id=decodedToken.userId
        next()
    })
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}

//   ---------------------------|| AUTHORISATION ||--------------------------------------

exports.authorisationUser=async (req,res,next)=>{
    try{
    const {userId}=req.params
    if(!isValidObjectId(userId)){
        return res.status(400).send({status:false,message:"please provide the valid adminid"})
    }
    let user=await userModel.findById(userId)
    if(!user) return res.status(404).send({status:false,message:"this admin is not exists"})
    if(req.id!=userId) return res.status(403).send({status:false,message:"unauthorised user"})
    next()
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}