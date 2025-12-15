const r=require("express").Router();
const Hotel=require("../models/Hotel");
r.get("/",async(req,res)=>res.json(await Hotel.find()));
r.post("/",async(req,res)=>{await new Hotel(req.body).save();res.json("Added");});
module.exports=r;