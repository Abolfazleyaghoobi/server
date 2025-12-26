const mogoose=require('mongoose')

const userSchema=new mogoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    family:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }

})
module.exports=mogoose.model('users',userSchema)