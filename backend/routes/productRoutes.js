import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler"
import { getProducts, getProductById, deleteProductById, updateProduct, createProduct, createProductReview, getTopProducts } from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router=express.Router();

//@desc    请求所有产品
//@route   GET/api/products
//@access  公开
router.route("/").get(getProducts)
    .post(protect,admin,createProduct)
    router.route('/top').get(getTopProducts)
//@desc    请求单个产品
//@route   GET/api/products/:id
//@access  公开
router.route("/:id")
    .get(getProductById)
    .delete(protect,admin,deleteProductById)
    .put(protect,admin,updateProduct)

router.route("/:id/reviews").post(protect,createProductReview)


export default router