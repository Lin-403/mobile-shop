import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler"

//@desc    请求所有产品
//@route   GET/api/products?keyword=${keyword}
//@access  公开
const getProducts = asyncHandler(async (req, res) => {
  //每页展示的产品数量
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1
  console.log(req.query)
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  //获取产品数量（包括符合条件的关键词）
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
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

//@desc    创建产品评论
//@route   POST/api/products/:id/reviews
//@access  私密
export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)
  
    if (product) {
      //判断用户是否已经评论
      const alreadeReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      )
  
      if (alreadeReviewed) {
        res.status(400)
        throw new Error('您已经评论过该产品！')
      }
  
      //创建新评论
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
      product.reviews.push(review)
      //更新产品的评论数及总评分
      product.numReviews = product.reviews.length
      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: '评论成功' })
    } else {
      res.status(404)
      throw new Error('查询不到产品')
    }
  })
  
  //@desc    请求排名前3的产品
//@route   GET/api/products/top
//@access  公开
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ price: -1 }).limit(3)

  res.json(products)
})

export {getProducts,getProductById}