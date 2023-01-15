const express=require("express")
const router=express.Router()
const {isValidReq}=require("../middleware/validRequest")
const {createUser,loginUser}=require("../controller/userController")
const {createAdmin,loginAdmin}=require("../controller/adminController")
const {createQuetion,updateQuestion}=require("../controller/quetionController")
const {startExam,solveQuestion}=require("../controller/examController")
const {authentication,authorisation}=require("../middleware/adminAuth")
const {authenticationUser,authorisationUser}=require("../middleware/userAuth")


router.post("/registerAdmin",isValidReq,createAdmin)
router.post("/loginAdmin",loginAdmin)
router.post("/createQuestion/:adminId",authentication,authorisation,createQuetion)
router.put("/updateQuestion/:adminId/:questionId",authentication,authorisation,updateQuestion)


router.post("/registerUser",isValidReq,createUser)
router.post("/loginUser",loginUser)
router.get("/startExam/:userId",authenticationUser,authorisationUser,startExam)
router.get("/solveQuestion/:userId/:questionId",authenticationUser,authorisationUser,solveQuestion)


router.all("/*",(req,res)=>{
    return res.status(404).send({status:false,message:`${req.url} is not found`})
})
module.exports=router