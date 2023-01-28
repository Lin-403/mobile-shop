import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";


const protect=asyncHandler(async(req,res,next)=>{
    let token 
    // console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token =req.headers.authorization.split(" ")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            // console.log(decoded);
            // 利用获取的token里的id进行查询，并排除掉password字段
            // 这样通过中间价拦截后的req就有一个user字段，里面还有用户的id
            req.user=await User.findById(decoded.id).select("-password")
            // next();
        }
        catch(error){
            res.status(401);
            throw new Error("Unauthorized,token validation failed!")
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Unauthorized, missing token!")
    }

    next();
    // return ;
})

export { protect}