React商城系统

# 启动前端

## 创建脚手架

```
 npx create-react-app frontend
```

设置rules关闭不需要的语法提示

```
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "rules":{
      "no-undef":"off",
      "no-restricted-globals":"off",
      "no-unused-vars":"off"
    }
  },
```

提交git

```
git init
git add .
git commit -m "react setup"
git remote add origin git@github.com:Lin-403/mobile-shop.git
git remote set-url origin git@github.com:Lin-403/mobile-shop.git
git pull --rebase origin master
git push -u origin master
```

## 创建header和footer

bootswatch主题样式

```
https://bootswatch.com/

// 下载min.css文件后引入到index.js中
import "./bootstrap.min.css"

下载
npm install react-bootstrap bootstrap

使用Container包裹主要部分

cdnjs引入图标
https://cdnjs.com/libraries/font-awesome
复制链接放到index.html中

```

## 创建主页面

分离组件传递参数，创建Product组件

```jsx
function Product(props) {
    const {product}=props
    console.log(product._id)
  return (
    <Card className='my-3 py-3 rounded'>
        <a href={`/products/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
        </a>
        <Card.Body>
            <a href={`products/${product._id}`}>
                <Card.Title>{product.name}</Card.Title>
            </a>
            <Card.Text as="div">
            <div className='my-3'>
                {product.rating}  是依据{product.numReviews}条评价数来计算 
            </div></Card.Text>
            <Card.Text as="h3">￥{product.price}</Card.Text>
        </Card.Body>
    </Card>
  )
}
```

Home界面传递参数，并使用map遍历引用。

```js
function HomeView() {
  return (
    <>
      <h1>最新产品</h1>
      <Row>{products.map(product=>(
        <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
        </Col>
      ))}</Row>
    </>
  )
}
```

## 创建评分组件

创建Rating可复用组件，并传入参数，引入到product组件中，使用font awesome字体图标显示星级

```jsx
const Rating = ({value,text,color}) => {
    var arr=[1,2,3,4,5];
  return (
    <div  className='rating'>
        {
        arr.map(i=>{
            // console.log(i,value)
            return <span>
            <i style={{color}} className={
                value>=i?"fas fa-star":value>=i-0.5?"fas fa-star-half-alt":"far fa-star"
            }></i>
        </span>
        })
        }
         <span> {text && text }</span>
    </div>
  )
}
Rating.defaultProps={   // 设置默认颜色
    color:"#f8e825"
}
Rating.propTypes={  // 限制参数类型
    value:propTypes.number.isRequired,
    text:propTypes.string.isRequired,
    color:propTypes.string,

}

export default Rating
```

## React路由

```jsx
npm i react-router-dom react-router-bootstrap

// routerv6 回顾
// 路由注册
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"  // 引入

// 整体使用BrowserRouter嵌套，Route外部使用Routes嵌套
<Router>
    <Routes>
    	<Route path="/" element={<HomeView/>} />
    	<Route path="/products/:id" element={<ProductView/>} />
	</Routes>  
</Router>

// 路由跳转 Link和NavLink
<Link to={`/products/${product._id}`}>
    <Card.Img src={product.image} variant="top" />
</Link>


// router-bootstrap使用
// 将Header组件中之前使用href进行跳转的路由使用LinkContainer重构
// 重构前
<Nav.Link href="/login"><i className='fas fa-user'/> Login</Nav.Link>
// 重构后
<LinkContainer to="/login">
    <Nav.Link><i className='fas fa-user'/> Login</Nav.Link>
</LinkContainer>

```

## 产品详情界面

```jsx
// 路由跳转使用Link
<Link className='btn btn-dark my-3' to="/">返回主页</Link>

// 编程式 获取参数
const params=useParams();
console.log(params.id) // 获取产品id
```

# 后端搭建

## express初步搭建

```js
npm init
npm i express

// 修改启动脚本
"scripts": {
    "start": "nodemon backend/server"
},
      
npm start启动项目
```

## 初步请求

```js
npm i axios

// 前端端口号3000，后端端口号8000，出现跨域问题
// 设置代理 proxy解决
// 前端项目文件package.json文件中
"proxy":"http://127.0.0.1:8000"


// 安装concurrently，可以同时运行多个脚本
"scripts": {
  "start": "node backend/server",
  "server": "nodemon backend/server",
  "client": "npm start --prefix frontend",
  "dev": "concurrently \"npm run server\" \"npm run client\""
  },
      
// 运行npm run dev  

```

## 设置环境变量

```js
// dotenv模块 构建环境变量文件
npm i dotenv

//创建.env配置文件，写入配置信息
NODE_ENV=development
# 开发模式
PORT=8000

// 外部使用
const dotenv=require("dotenv")
dotenv.config()
const PORT=process.env.PORT || 8000
```

## 前后端模块化统一

ESModule和CommonJS区别

```
1.语法上：
CommonJS
导入：require
导出：module.exports
ESModule
导入：import
导出：export

2.用法
CommonJS：require（）同步加载引入的，js是单线程，会造成阻塞
ESModule：import异步引入，不会阻塞
nodeJS默认使用的是CommonJS规范
浏览器使用的是ESModule异步加载引入，防止阻塞页面渲染而出现卡顿现象
 
3.值的处理
CommonJS ：对值拷贝
ESModule：对值引用
```

二者转换方法：

```
nodeJS下【.js文件】默认使用CommonJS，如果想要使用ES6新增得ESModule需要采用【.mjs】的文件后缀名。
如果不想修改后缀名，在【package.json】文件里添加【{ "type" : "module" }】
如果修改了json文件，我们想要使用【CommonJS模块】，创建文件后缀名为【.cjs】
```

# MongoDb数据库搭建

## 连接数据库

```js
npm i mongoose

// db.js
import mongoose from "mongoose";
// 连接数据库
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.DB_URI,{
                useUnifiedTopology:true,
                useNewUrlParser:true,
                // useCreateIndex:false,
            })
        console.log(`Mongodb connected with server : ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error:${err or.message}`)
        process.exit(1)
    }
}
export default connectDB;
```

## Colors工具引入

可以给打印在控制台的文字添加样式

```js
console.log(`服务器在${process.env.NODE_ENV}模式下${PORT}端口运行`.cyan.underline)
// .cyan青色  .underline下划线

```

## 创建数据模型

```js
// 产品
const productSchema=mongoose.Schema({
    user:{
        // 关联到User表，外键id
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    reviews:[reviewSchema],
    numReviews:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        default:0,
    },
    countInStock:{
        type:Number,
        required:true,
        default:0,
    },
    
},{
    timestamps:true
})

```

##    创建样本数据

使用bcryptJS进行数据加密，

（与bcrypt区别：bycryptJS依赖项较少）

```
npm i bcryptjs
bcrypt.hashSync("123456",10)
```

## 创建seeder播种

seederjs文件可以将对应的样本数据，填入对应的数据库中，相当于播种机的作用，将数据播种到数据库。

```js
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users";
import products from "./data/products";
import User from "./models/userModel";
import Product from "./models/productModel";
import Order from "./models/orderModel";
import connectDB from "./config/db";

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



// package.json文件修改命令
"data:import":"node backend/seeder",
"data:destory":"node backend/seeder -d"
```

## 请求编写

express异步处理机制 express-async-handler

```
npm i express-async-handler
// 使用方法
router.get("/",asyncHandler(async(req,res)=>{
    const products=await Product.find({})
    res.json(products)
}))

```

## 使用postman

postman全局变量使用

添加全局变量URL值为：http://localhost:8000 并在对应项目下选择对应的全局变量（右上角）

## 自定义错误处理中间件

当访问某个id对应的商品时，如果不是32位格式写法，就会返回一个html报错界面，所以自定义错误处理中间件进行处理。

```js
// 设计中间件
const notFound=(req,res,next)=>{
    const error=new Error(`404 Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error)
}

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200?500:res.statusCode;

    res.status(statusCode);
    console.log(err.message,statusCode)
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==="production"?null:err.stack,
    })
}

export {notFound,errorHandler}

// server.js文件下注册中间件
// 404错误处理中间件
app.use(notFound)

// 错误处理中间件，会接收上一个中间件的next(error)并做报错处理
app.use(errorHandler)
```

# redux状态管理

## 创建redux store

```js
npm i redux react-redux redux-thunk redux-devtools-extension
 
// 创建store
import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer=combineReducers({})

const initialState={};

const middleware=[thunk];

// 创建store
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store; 


// index.js入口文件引入store
import {Provider} from "react-redux";
import store from "./store";
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

## 创建reducer和actions

```js
// reducer.js 创建不同操作下的loading状态值和products值
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../contents/productConstents";

export const productListReducer=(state={product:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true,products:[]};
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;

    }
}

//actions.js使用dispatch对store进行操作
// 其中包括开始的请求Request，请求成功Success以及请求失败的状态改变
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../contents/productConstents";
import axios from "axios";

// 获取所有商品的action
export const listProducts=()=>async(dispatch)=>{

    try{
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data}=await axios.get("/api/products")
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});

    }
    catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}

```

eg:https://www.jianshu.com/p/d33a53fa0e76

```js

// views文件中，组件需要获取store中的状态
// 首先使用useDispatch获取dispatch方法，然后发送实现定义好的action即可对store中的state做出改变
// 然后使用useSelector获取Store中state

const dispatch=useDispatch();
  const productList=useSelector((state)=>state.productList);
  const {loading,error,products}=productList;

  useEffect(() => {
   if(products.length===0){
    dispatch(listProducts())
   }
  },[dispatch])
```

# 添加购物车

## 数量选择和路由跳转

添加下拉框，选择添加商品的数量

```js
 <ListGroup.Item>
     <Row>
     <Col>购买数量：</Col>
<Col>
     <Form.Control as="select" value={qty}
onChange={(e)=>setQty(e.target.value)}
    >
        {[...Array(product.countInStock).keys()].map(item=>
         <option key={item+1} value={item+1}>{item+1}</option>)}
   		 </Form.Control>
   	 </Col>
    </Row>
</ListGroup.Item>
```

然后使用编程式路由（Rv6）useNavigate进行路由的跳转

```js
// 对按钮添加点击事件
 <ListGroup.Item className='d-grid gap-2'>
     <Button
onClick={addToCartHandler}
type="button" disabled={product.countInStock===0}>添加到购物车</Button>
</ListGroup.Item>

// 方法注册，使用useNavigate路由跳转
// 添加商品到购物车
const navigate=useNavigate()
const addToCartHandler=()=>{
    navigate(`/cart/${params.id}?qty=${qty}`)
}
```

## Cart界面实现及redux存储

redux存储---添加商品

```js
// reducer
import { CART_ADD_ITEM } from "../contents/cartConstents";

export const  cartReducers=(state={cartitem:[]},action)=>{
   switch (action.type) {
    case CART_ADD_ITEM:{
        const item=action.payload ;
        const exitItem=state.cartItems.find(x=>x.product===item.product)
        if(exitItem){
            return {
                ...state,
                cartItems:state.cartItems.map(x=>
                    x.product===exitItem.product?item:x    
                )
            }
        }
        else {
            return {
                ...state,
                cartItems:[...state.cartItems,item],
            }
        }
    }
    default:
        return state;
   }
}

// 相应axction
import axios from "axios"
import { CART_ADD_ITEM } from "../contents/cartConstents";

export const addToCart=(id,qty)=>async(dispatch,getState)=>{
  const {data}=await axios.get(`/api/products/${id}`);
  dispatch({
    type:CART_ADD_ITEM,
    payload:{
        product:data._id,
        name:data.name,
        image:data.image,
        price:data.price,
        countInStock:data.countInStock,
        qty,
    }
  })
  // 数据进行本地存储，防止下次访问请求过慢
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

// store中初始化数据
// 初始化获取本地存储的购物车信息
const cartItemsFromStorage=localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: []
const initialState={
    cart:{cartItems:cartItemsFromStorage},
};
```

## 删除购物车功能

```js
// reducer
    case CART_REMOVE_ITEM:{
        return {...state,cartItems:state.cartItems.filter(x=>x.product!==action.payload)}
    }
// action

// 删除产品action
export const removeFromCart=(id)=>async(dispatch,getState)=>{
  dispatch({
    type:CART_REMOVE_ITEM,
    payload:id,
  })
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}
```

