import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler"

const router=express.Router();

//@desc    请求所有产品
//@route   GET/api/products
//@access  公开
router.get("/",asyncHandler(async(req,res)=>{
    const products=await Product.find({})
    res.json(products)
}))

//@desc    请求单个产品
//@route   GET/api/products/:id
//@access  公开
router.get("/:id",asyncHandler(async(req,res)=>{

    var product=null;
    try {
        product=await Product.findById(req.params.id)
    } catch (error) {
        product=null;
    }
    if(product){
        res.json(product)
    }
    else {
        res.status(404);
        // console.log(product)
       
        throw new Error("Can't find this productId!")
    }
    
}))

export default router