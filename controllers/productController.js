import mongoose from "mongoose";
import Product from "../models/Product.js";

//Add Product

export const addProduct = async(req,res)=>{
    try{
        const {name,price,manufacturer,seller} = req.body;

        const product = new Product({
            name,
            price,
            manufacturer:new mongoose.Types.ObjectId(manufacturer),
            seller,
            status:"instock",
        });

        await product.save();
        res.status(201).json({message:"Product added Successfully",product});
}
catch(error){
    res.status(500).json({message:"Error adding product",error});
}
};


//Update Product Status API

export const updateProductStatus =  async(req,res)=>{
    try{
        const {productId} = req.params;
        const {status,updatedBy} = req.body;

        const product = await Product.findByIdAndUpdate(
            productId,
            {status,lastUpdatedBy:updatedBy},
            {new:true}
        );

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
       res.status(200).json({message:"Product status updated",product});
    }
    catch(error){
        res.status(500).json({message:"Error updating status",error});
    }
};

//Get Faculty Products API

export const getFaultyProducts = async(req,res)=>{
    try{
        const products = await Product.find({status:"faulty"});
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({message:"Error fetching faulty products", error})
    }
};