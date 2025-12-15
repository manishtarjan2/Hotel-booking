const mongoose=require("mongoose");
module.exports=mongoose.model("Booking",new mongoose.Schema({
userId:String,hotelId:String,date:String
}));