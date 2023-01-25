import  express from "express"
import  products from "./data/products.js"
import  dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import { notFound, errorHandler } from "./middleware/errormiddleware.js"

dotenv.config()
connectDB();

const PORT=process.env.PORT || 8000

const app=express();
app.get("/",(req,res)=>{
    res.send("服务器已经运行...")
})

// 应用级中间件
app.use("/api/products",productRoutes)

// 404错误处理中间件
app.use(notFound)

// 错误处理中间件，会接收上一个中间件的next(error)并做报错处理
app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`服务器在${process.env.NODE_ENV}模式下${PORT}端口运行`)
})
