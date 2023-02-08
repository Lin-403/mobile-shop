import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler"

//@desc    请求所有产品
//@route   GET/api/products
//@access  公开
const getProducts=asyncHandler(async(req,res)=>{
    const products=await Product.find({})
    res.json(products)
})

//@desc    请求单个产品
//@route   GET/api/products/:id
//@access  公开
const getProductById=asyncHandler(async(req,res)=>{

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
    return ;
})

//@desc    删除单个产品
//@route   DELETE /api/products/:id
//@access  公开
export const deleteProductById=asyncHandler(async(req,res)=>{

    var product=null;
    try {
        product=await Product.findById(req.params.id)
    } catch (error) {
        product=null;
    }
    if(product){
        await product.remove();
        res.json({message:"Delete successfully!"})
    }
    else {
        res.status(404);
        // console.log(product)
       
        throw new Error("Can't find this productId!")
    }
    return ;
})

//@desc    创建单个产品
//@route   PUT /api/products
//@access  公开
export const createProduct=asyncHandler(async(req,res)=>{

    const product = new Product({
        name: '样品名称',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: '样品品牌',
        category: '样品分类',
        countInStock: 0,
        numReviews: 0,
        description: '样品描述',
        rating: 0,
      })
      const createdProduct = await product.save()
      res.status(201).json(createdProduct)
})

//@desc    更新产品内容
//@route   PUT/api/products/:id
//@access  私密（仅限管理员）
export const updateProduct = asyncHandler(async (req, res) => {

    var product = await Product.findById(req.params.id)
    
    if (product) {
       Object.keys(req.body).map(item=>{
           product[item]=req.body[item];
       })
      const updatedProduct = await product.save()
      res.status(201).json(updatedProduct)
    } else {
      res.status(404)
      throw new Error('查询不到产品')
    }
  })



export {getProducts,getProductById}