import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler"
import { getProducts, getProductById } from "../controllers/productController.js";

const router=express.Router();

//@desc    请求所有产品
//@route   GET/api/products
//@access  公开
router.route("/").get(getProducts)

//@desc    请求单个产品
//@route   GET/api/products/:id
//@access  公开
router.route("/:id").get(getProductById)

export default router