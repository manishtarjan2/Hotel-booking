const mongoose=require("mongoose");
module.exports=mongoose.model("Hotel",new mongoose.Schema({
name:String,location:String,price:Number
}));