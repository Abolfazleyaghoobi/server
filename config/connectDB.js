const mongoose=require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("conneted successfully"))
.catch((er)=>console.log(er))