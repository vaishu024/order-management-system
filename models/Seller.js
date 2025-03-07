import mongoose from "mongoose";


const sellerSchema = new mongoose.Schema(
    {
name:{
    type:String,
    required:true,
    trim:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
phone:{
    type:String,
    required:true,
},


},
{timestamps:true}

);

export default mongoose.model("Seller",sellerSchema);