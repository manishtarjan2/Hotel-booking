const r=require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
r.post("/register",async(req,res)=>{
const u=new User({...req.body,password:await bcrypt.hash(req.body.password,10)});
await u.save();res.json("Registered");
});
r.post("/login",async(req,res)=>{
const u=await User.findOne({email:req.body.email});
if(!u)return res.status(400).json("User not found");
if(!await bcrypt.compare(req.body.password,u.password))
return res.status(400).json("Wrong password");
res.json({token:jwt.sign({id:u._id},"secret")});
});
module.exports=r;