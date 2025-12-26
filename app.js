require("dotenv").config()
const express=require('express')
require("./config/connectDB")
const userModel=require("./models/userModel")
const productRoute=require("./routes/products/product")
const cors= require("cors")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/products",productRoute)









app.listen(5050,()=>{
    console.log("server is running in port 5050");
    
})