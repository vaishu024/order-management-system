import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        price:{
            type:Number,
            required:true,
        },
        status:{
            type:String,
            enum:["instock","outofstock","faulty"],
            default:"instock",
        },
        manufacturer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Manufacturer",
        },
        seller:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Seller",
        },
        lastUpdatedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User", //Either Manufacturer or Seller
        },

    },
    {timestamps:true}
);

export default mongoose.model("Product",productSchema);