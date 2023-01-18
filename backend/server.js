import  express from "express"
import  products from "./data/products.js"
import  dotenv from "dotenv"

dotenv.config()

const PORT=process.env.PORT || 8000

const app=express();
app.get("/",(req,res)=>{
    res.send("服务器已经运行...")
})

app.get("/api/products",(req,res)=>{
    res.json(products)
})

app.get("/api/products/:id",(req,res)=>{
    const product=products.find((product)=>product._id===req.params.id)
    res.json(product)
})

app.listen(PORT,()=>{
    console.log(`服务器在${process.env.NODE_ENV}模式下${PORT}端口运行`)
})