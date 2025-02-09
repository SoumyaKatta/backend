/* eslint-disable @typescript-eslint/no-unused-vars */
const express = require('express');
const app = express();
const cors = require('cors')
const User = require('./models/User')
app.use(express.json())
const corsOptions = {
    origin: ['http://localhost:4000','http://localhost:3000']
}
app.use(cors(corsOptions))
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
app.get('/',(req:any,res:any)=>{
    res.json('loginn success')
})
app.post('/register',async(req:any,res:any)=>{
    const {username, email, password} = req.body;
    try{
        console.log("usermodel was")
        const user = await User.findOne({email:email})
        if(user){
         res.json("user already exists")
      }
      const hashpassword = await bcrypt.hash(password, 12)
      const newUser = await User.create({
        ...req.body,
        password:hashpassword
      })
      const token = jwt.sign({_id:newUser._id},'secretkey123',{
        expiresIn:'90d'
      })
      res.status(201).json({
        status:"success",
        message:"user registered",
        token,
      })
    }
    catch(err){
      res.json(err)
    }

})
app.post("/login",async(req:any,res:any)=>{
  const {username,email,password} = req.body
  const user = await User.findOne({email})
  if(!user) res.json('user not found');
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if(!isPasswordValid) res.json("Invalid email or password");
  const token = jwt.sign({_id:user._id},'secretkey123',{
    expiresIn:'90d'
  })
  res.status(201).json({
    status:"success",
    message:"user login successfully",
    token,
    user:{
      _id:user._id,
      username:user.username,
      email:user.email,
    }
  })
})
app.listen(4000);
export default app;