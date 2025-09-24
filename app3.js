// COOKIE AND AUTH CONCEPT 
const jwt=require('jsonwebtoken')
const cookieparser=require('cookie-parser')
const express = require('express');
const connectDB = require('./database');
const app = express();
const user = require('./user.js')
const {ValidateUserData} = require('./validator.js')
const bcrypt = require('bcrypt')
const userAuth = require('./Auth.js')
// MIDDLEWARES
app.use(express.json())
// to read cookie we need cookieparser you need to parse it then u will be able to read
app.use(cookieparser())


app.get("/profile",userAuth,async(req,res)=>{
try{
const user_info=req.user_info
res.send(user_info)
}
  catch(err){
         res.status(500).send("Error saving user: " + err.message);
   }
})
app.get("/feed",async(req,res)=>{
   
   try{
      const users = await user.find({})
      res.send(users)
   }
   catch(err){
         res.status(500).send("Error saving user: " + err.message);
   }
})

app.get("/user",async(req,res)=>{
   const email = req.body.emailId
   try{
      const users = await user.findOne({emailId:email})
      res.send('user get successfull')
      console.log(users)
   }
    catch(err){
         res.status(500).send("Error saving user: " + err.message);
   }
})


app.post("/signup",async(req,res)=>{
   try{
      const{firstName,lastName,emailId,password}=req.body
      // Validating the data
      ValidateUserData(req)
      //encrypt the password
      const Password_hash = await bcrypt.hash(password,10)

      

      const user1 = new user ({
         firstName,
         lastName,
         emailId,
         password:Password_hash
      })
      await user1.save()
      res.send("data added successfully")
   }
   catch(err){
         res.status(500).send("Error saving user: " + err.message);
   }

})
app.post("/login",async(req,res)=>{
   try{
        const{emailId,password}=req.body
        const user1=await user.findOne({emailId:emailId})
          if(!user1){
           throw new Error("Invalid crediantials")
}
  const password_match =await bcrypt.compare(password,user1.password)

if(password_match){
    // custom cookie
    //   res.cookie("token","hellothisiscookie")
    // using jwt
    const Token=jwt.sign({_id:user1._id},"Anu@123",{expiresIn:"1d"})
      res.cookie("Token",Token)
      res.send("Login successfull")
}
else{
throw new Error("Invalid crediantials")
}
}
   
    catch(err){
         res.status(500).send("Error saving user: " + err.message);
   }
})

app.delete("/delete",async(req,res)=>{


  try{
    const userId = req.body.userId
     const userdelete =await user.findByIdAndDelete(userId)
      res.send("data deleted successfully")
   }
   catch(err){
         res.status(500).send("Error deleting  user: " + err.message);
   }
})


app.patch("/update/:userId",async(req,res)=>{
   // we are also updating user id but it is not right but we are getting through body i.e the problem s
   // so we should use dyanmic routing 

   //  const userId = req.body.userId 
     const userId =req.params?.userId
    const users=req.body
    //API LEVEL DATA SANITIZATION
 // aise database me user kuch bhi send kar dega to yeh check hai api level me 
    const ALLOWED_UPDATES = [
      'age','gender',
    ]
    const isupdate = Object.keys(users).every((k) =>
    ALLOWED_UPDATES.includes(k))

    if(!isupdate){
      res.status(404).send("update not allowed")
    }
try{
    // runvalidator because if we update the data after adding custom validation
    //  then it will not update it will only allow new data so we have to add runValidators as true
    
     await user.findByIdAndUpdate(userId,users,{runValidators:true})
      res.send("data updated successfully")
   }
   catch(err){
         res.status(500).send("Error deleting  user: " + err.message);
   }

})




connectDB().then(()=>{
    try{
       console.log("DB connected successfully")
       app.listen(3000,()=>{
           console.log("server is running on port 3000")
       })
      
    }
    catch(err){
       console.log("Error in DB connection" + err.message)
    }
})
