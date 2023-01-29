import User from "../models/userModel.js";
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";

//@desc    用户验证 & 获取token
//@route   POST/api/users/login
//@access  公开
const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    // res.send({email,password})
    const user=await User.findOne({email});

    if(user && await user.matchPassword(password)){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password!");
    }
    // return ;
})


//@desc    用户注册
//@route   POST/api/users
//@access  公开
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    // res.send({email,password})
    const userExists=await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exist!");
    }
    const user=await User.create({name,email,password});
    if(user){
        res.status(201)
        .json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error("Invalid user information!");
    }
    // return ;
})


//@desc    获取登陆成功的用户详情
//@route   GET/api/users/profile
//@access  私密
const getUserProfile=asyncHandler(async(req,res)=>{
    // res.send("hahahahaha")
    // 获取经过中间价处理后的user信息(id)
    // 然后通过这个id值进行数据的获取

    const user=await User.findById(req.user._id);
    console.log(user)
    // res.send({name:"123123"})
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            
        })
    }
    else {
        res.status(404);
        throw new Error("The user does not exist!")
    }
    // return ;
})

//@desc    更新用户个人资料
//@route   PUT/api/users/profile
//@access  私密
const updateUserProfile=asyncHandler(async(req,res)=>{
    // res.send("hahahahaha")
    // 获取经过中间价处理后的user信息(id)
    // 然后通过这个id值进行数据的获取

    const user=await User.findById(req.user._id);
    // 获取更新后的资料
    if(user){
       user.name=req.body.name || user.name
       user.email=req.body.email||user.email 
       if(req.body.password){
        user.password=req.body.password
       }
       const updateUser=await user.save();
       // 返回更新后的用户信息
       res.json({
        _id:updateUser._id,
        name:updateUser.name,
        email:updateUser.email,
        isAdmin:updateUser.isAdmin,
        token:generateToken(updateUser._id)
    })
    }
    else {
        res.status(404);
        throw new Error("The user does not exist!")
    }
})


export {authUser,getUserProfile,registerUser,updateUserProfile}