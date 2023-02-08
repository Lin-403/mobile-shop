import  express from "express"
import  products from "./data/products.js"
import  dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { notFound, errorHandler } from "./middleware/errormiddleware.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan'
import axios from "axios"
import  qr from 'qr-image';


import path from 'path'
dotenv.config()
connectDB();

const PORT=process.env.PORT || 8000

const app=express();
// 利用中间件对传递得到请求转成json形式
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'))
}


app.get("/",(req,res)=>{
    res.send("服务器已经运行...")
})

//获取paypal的clientID
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
  })
  

// 应用级中间件
app.use("/api/products",productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)
app.use('/api/upload', uploadRoutes)

app.post('/Code',(req,res)=>{
    let text = 'https://blog.csdn.net/qq_45856669?type=blog';
    let svg_string = qr.imageSync(text, { type: 'svg' });
    res.send(svg_string);
})




//upload文件夹作为静态文件
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// 404错误处理中间件
app.use(notFound)

// 错误处理中间件，会接收上一个中间件的next(error)并做报错处理
app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`服务器在${process.env.NODE_ENV}模式下${PORT}端口运行`)
})
