import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js";

//@desc    创建订单
//@route   POST/api/orders
//@access  私密
export const addOrderItems=asyncHandler(async(req,res)=>{
    // console.log("----------")
   const {orderItems,shippingAddress,paymentMethod,itemsPrice,
shippingPrice,totalPrice}=req.body;

    if(orderItems && orderItems.length===0){
        res.status(400)
        throw new Error("没有订单信息")
    }
    else {
        const order=new Order({
            user:req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        })
        const createOrder=await order.save();
        res.status(201).json(createOrder);
    }
})

//@desc    依据订单id获取订单
//@route   GET/api/orders/:id
//@access  私密
export const getOrderById=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id).populate(
        "user",
        "name email",
    )
    if(order){
        res.json(order);
    }
    else {
        res.status(404);
        throw new Error("查询不到订单！")
    }
})
  //@desc    获取所有订单
//@route   GET/api/orders
//@access  私密(仅限管理员)
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
  })

  //@desc    更新支付的订单付款状态
//@route   PUT/api/orders/:id/pay
//@access  私密
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    console.log(req.body)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      }
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('查找不到订单')
    }
  })
  
 //@desc    获取登录用户所有订单
//@route   GET/api/orders
//@access  私密(仅限管理员)
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user:req.user._id})
  res.json(orders)
})

//@desc    更新支付的订单的发货状态
//@route   PUT/api/orders/:id/deliver
//@access  私密（仅限管理员）
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('查找不到订单')
  }
})
