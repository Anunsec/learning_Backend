const jwt = require('jsonwebtoken')
const user=require('./user')


const userAuth = async(req,res,next)=>{
const cookies=req.cookies
const{Token}=cookies
if(!Token){
    throw new Error("Token is invalid ! ! !")
}
const decoded_message=await jwt.verify(Token,"Anu@123",{expire})
const{_id} = decoded_message

const user1=await user.findById(_id)
if(!user1){
      throw new Error("USER NOT FOUND ! ! !")
}
req.user_info=user1
next() // use next becase it is middleware and also after middleware work well then 
// it pass the execution to api function

}
module.exports=userAuth