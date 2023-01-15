
const quetionModel=require("../model/quetionModel")
const {isValidObjectId}=require("mongoose")

exports.startExam=async (req,res)=>{
    try{
    let questions = await quetionModel.aggregate([{$sample :{size:10}}])
    let exam=[];
   for (let i = 0; i < questions.length; i++) {
    const element = questions[i];
    let obj={}
    obj.questionId=element._id
    obj.question=element.question
    obj.option_1=element.option_1
    obj.option_2=element.option_2
    obj.option_3=element.option_3
    obj.option_4=element.option_4
    obj.attachmentsImage=element.attachmentsImage
    obj.attachmentsVideo=element.attachmentsVideo
    exam.push(obj)
   }
   return res.status(200).send({status:true,message:"exam is started now...",questionPaper:exam})
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}
}



exports.solveQuestion=async (req,res)=>{
    try{
    const {questionId}=req.params
    const {answer}=req.body
    let validOptions=["option_1","option_2","option_3","option_4"]
    if(!validOptions.includes(answer)) return res.status(400).send({status:false,message:"please provide the valid options"})
    if(!isValidObjectId(questionId)){
        return res.status(400).send({status:false,message:"please provide the valid questionId"})
    }
    let question=await quetionModel.findById(questionId)
    if(!question) return res.status(404).send({status:false,message:"this question is not exists"})
    if(question[answer]==question.correctAnswer){
        return res.status(200).send({status:true,message:`${question[answer]} is correct answer` ,correctAnswer:question.correctAnswer, equetion:question.equetion})
    }else{
        return res.status(200).send({status:true,message:`${question[answer]} is wrong answer` ,correctAnswer:question.correctAnswer, equetion:question.equetion})
    }
}catch(err){
    return res.status(500).send({status:false,message:err.message})
}  
}

