
const validator = require('validator')
const ValidateUserData = (req) =>{
  const{firstName,lastName,emailId,age,password}=req.body

    if(!firstName || !lastName){
        throw new Error("NAME IS NOT FOUND")
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Email is NOT FOUND")
    }
     if(!validator.isStrongPassword(password)){
        throw new Error("password is NOT strong")
    }
     if(age<18){
        throw new Error("age is greater than 18")
    }
}
module.exports={
    ValidateUserData
}