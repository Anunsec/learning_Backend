const express = require('express')
const app = express()
const user=require('./user.js')
const connectDB=require('./database.js')
// STATIC DATA ADDED

// app.post("/signup",async (req,res)=>{
//     try{
//     const user1=new user({
//         firstname:"anurag",
//         lastname:"kumar",
//         emailId:"coderanurag3902@gmail.com",
//         gender:'M',
//         age:22

//     })
//     await user1.save()
//     res.send("user added successfully")
// }catch(err){
// res.status(500).send("something went wrong")
// }
// })

//
//MIDDLEWARE FOR HANDLING JSON
app.use(express.json())
//DYNAMIC DATA ADDING
app.post("/signup",async(req,res)=>{
    try{
    const user1= new user(req.body)
    await user1.save()
    res.send("jio beta sikh liya tum")
    }
    catch(err){
        res.status(500).send("something went wrong")
    }
})

app.delete("/deleteuser",async(req,res)=>{
    const userId = req.body.userId
    try{
       const user1=await user.findOneAndDelete(userId)
       res.send("data deleted Sucessfully")
    }
    catch(err){
        res.status(500).send("something went wrong")
    }
    
})

connectDB().then(()=>{
    try{
        console.log("DB Connected Successfully");
        app.listen(8000,()=>{
          console.log("server is running on 8000 port");
        })
    }
    catch(err){
        console.error("something went wrong")
    }
})
