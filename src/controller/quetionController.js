const { isValidString } = require("../validator/validator");
const {uploadFile}=require("./aws")
const questionModel=require("../model/quetionModel");
const {isValidObjectId}=require("mongoose")
//   ---------------------------|| CREATE_QUESTION ||--------------------------------------
exports.createQuetion=async (req,res)=>{
    try{
    let files=req.files
    console.log(files)
    let request=Object.keys(req.body)
    if(request.length==0 && req.files.length==0) return res.status(400).send({status:false,message:"please provide data"})
    let itsMandatory=["question","option_1","option_2","option_3","option_4","correctAnswer"]
    for (let i = 0; i < itsMandatory.length; i++) {
        const element = itsMandatory[i];
        if(!request.includes(element)){
            return res.status(400).send({status:false,message:`${element} is mandatory`})
        }
        if(!isValidString(req.body[element])){
            return res.status(400).send({status:false,message:`please provide valid ${element}`})
        }
    }
  
    let {equetion}=req.body
    if(equetion){
        if(!isValidString(equetion)) return res.status(400).send({status:false,message:"please provide valid equetion"})
    }

    if(files.length>0){
    for (let i = 0; i < files.length; i++) {
        const element = files[i];
        if(element.fieldname=="attachmentsImage"){
           req.body.attachmentsImage=await uploadFile(element)
        }
        if(element.fieldname=="attachmentsVideo"){
            req.body.attachmentsVideo=await uploadFile(element)
         }
        
    }
}
let question=await questionModel.create(req.body)
return res.status(201).send({status:true,message:"question created successfully",data:question})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
    
}

//   ---------------------------|| UPDATE_QUESTION ||--------------------------------------
exports.updateQuestion=async (req,res)=>{
    try{
    const {questionId}=req.params
    if(!isValidObjectId(questionId)){
        return res.status(400).send({status:false,message:"please provide the valid questionId"})
    }
    let question=await questionModel.findById(questionId)
    if(!question) return res.status(404).send({status:false,message:"this question is not exists"})

    let files=req.files
    if(files.length>0){
        for (let i = 0; i < files.length; i++) {
            const element = files[i];
            if(element.fieldname=="attachmentsImage"){
               req.body.attachmentsImage=await uploadFile(element)
            }
            if(element.fieldname=="attachmentsVideo"){
                req.body.attachmentsVideo=await uploadFile(element)
             }
            
        }
    }
    
    let request=Object.keys(req.body)
    if(request.length==0 && req.files.length==0) return res.status(400).send({status:false,message:"please provide data for update question"})
    let itsValid=["question","option_1","option_2","option_3","option_4","correctAnswer","equetion","attachmentsVideo","attachmentsImage"]
    for (let i = 0; i < request.length; i++) {
        const element = request[i];
        if(!itsValid.includes(element)){
            return res.status(400).send({status:false,message:`${element} is not valid properties`})
        }
        if(!isValidString(req.body[element])){
            return res.status(400).send({status:false,message:`please provide valid ${element}`})
        }
    }
    let {equetion}=req.body
    if(equetion){
        if(!isValidString(equetion)) return res.status(400).send({status:false,message:"please provide valid equetion"})
    }

    let updateQuestion=await questionModel.findByIdAndUpdate({_id:questionId},req.body,{new:true})
return res.status(200).send({status:true,message:"question updated successfully",data:updateQuestion})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
}

