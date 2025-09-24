const mongoose=require('mongoose')
const validator=require('validator')
const userschema = new mongoose.Schema({
    firstName:{
        type:String,
        //required:true
    },
     lastName:{
        type:String,
    },
     emailId:{
        type:String,
        unique:true,
        validate(value){
            // using validate library
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
     gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new error(err.message)
            }
        }
    },
     age:{
        type:Number,
     },
    password: {
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Strong password required")
            }
        }
     }
},
{
    timestamps:true,
})

module.exports = mongoose.model("user",userschema)