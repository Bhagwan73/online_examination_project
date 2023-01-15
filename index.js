const express=require("express")
const mongoose=require("mongoose")
const route=require("./src/route/route")
const app=express()
const multer=require("multer")
app.use(express.json())
app.use(multer().any())

require("dotenv").config({path:"./config.env" })

mongoose.set('strictQuery', true)
mongoose.connect(`${process.env.MongoDB}`, {useNewUrlParser:true})
.then(()=>console.log("Mongo-DB is connected"))
.catch((err)=>console.log(err))

app.use("/",route)
app.listen(`${process.env.PORT}`, ()=>{
    console.log(`express connected on port ${process.env.PORT}`)
})
