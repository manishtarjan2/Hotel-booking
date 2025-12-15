const r=require("express").Router();
const Booking=require("../models/Booking");
r.post("/",async(req,res)=>{await new Booking(req.body).save();res.json("Booked");});
module.exports=r;