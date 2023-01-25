import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

// 插入样本数据到数据库
const importData=async()=>{
    try{
       // 清空数据库中的样本数据
       await Order.deleteMany();
       await User.deleteMany();
       await Product.deleteMany();
       // 实现样本数据
       const createdUsers=await User.insertMany(users);
       // 实现产品表数据插入的时候需要注意
       // Product表中需要user字段，所以需要获取管理员id
       // 然后合并到一个对象中插入数据库
       const adminUser=createdUsers[0]._id
       const sampleProducts=products.map(product=>{
        return {...product,user:adminUser};
       })
       await Product.insertMany(sampleProducts);
       console.log("样本数据添加成功".green.inverse);
       process.exit(1);
    }
    catch(error){
         console.error(`${error}`.red.inverse);
         process.exit(1);
    }
}

// 插入样本数据到数据库
const destroyData=async()=>{
    try{
       // 清空数据库中的样本数据
       await Order.deleteMany();
       await User.deleteMany();
       await Product.deleteMany();
       
       console.log("样本数据销毁成功".green.inverse);
       process.exit(1);
    }
    catch(error){
         console.error(`${error}`.red.inverse);
         process.exit(1);
    }
}


// 判断命令行执行的函数
// 会判断命令函输入的第几个参数来决定执行哪个函数
// 比如：node backend/seeder -d表示执行destroyData();
process.argv[2] === "-d"? destroyData() : importData();