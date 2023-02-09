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

# 用户登录验证

## Controller控制器

提取路由请求相关的代码，封装到控制器controllers中

```js
// productController.js
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
        throw new Error("Can't find this productId!")
    }
    
})

export {getProducts,getProductById}

//route
router.route("/").get(getProducts)
router.route("/:id").get(getProductById)

```

## 用户认证路径

```js
//  添加相应路由
import express from "express";
import { authUser } from "../controllers/userController.js";

const router=express.Router();
router.post("/login",authUser)
export default router

// server文件注册使用相应中间件，
// 利用中间件对传递得到请求转成json形式
app.use(express.json())
```

添加验证模型--- 直接在创建模型的时候进行身份的验证

使用bcrtypt进行校验（对加密数据进行校验）

```js
// 实现用户密码是否匹配
userSchema.methods.matchPassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
```

设置controller控制器

```js
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
            token:null 
        })
    }
    else {
        res.status(401);
        throw new Error("Invalid email or password!");
    }
})
```

## 生成JWT令牌

```js
// npm i jsonwebtoken
import jwt from "jsonwebtoken"

const generateToken=(id)=>{
    // console.log(process.env.JWT_SECRET)
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    })
}

export default generateToken
```

并在控制器中登陆时调用

## 自定义认证中间件

创建访问用户信息的路由，并使用中间价进行拦截

（验证token---token鉴权）

```js
// userRoutes.js
router.route("/profile").get(protect,getUserProfile)

// 发起请求时需要携带token并且拼接Bearer [token]

```

校验中间件的编写

（获取token并校验，校验通过会拦截密码，然后返回给控制器user相关信息【挂在在req中】）

```js
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
```

控制器处理获取到的信息并返回

```js
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
```

## postman全局保存token

在postman的post请求时添加test

```
pm.environment.set("TOKEN",pm.response.json().token)
```

## 用户注册和密码加密

```js
// 设置contorller
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

// 路由注册
router.route("/").post(registerUser)

// 获取登陆密码后需要在存入数据库中进行加密
// 实现用户密码加密
// pre即在数据保存到数据库之前的操作
userSchema.pre("save",async function (next){
    // 判断密码是否有修改
    if(!this.isModified("password")){
        next();
    }
    // 有变化则需要将传递过来的数据进行加密处理
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})
```

# 前端用户认证

```js
// 编写相应的action
// 用户登录Action
export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUEST});
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.post("/api/users/login",{email,password},config);
        dispatch({type:USER_LOGIN_SUCCESS,payload:data});
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}

// store中初始化引入
// 获取本地存储的登录用户信息
const userInfoFromStorage=localStorage.getItem("userInfo")?
JSON.parse(localStorage.getItem("userInfo")):null;
const initialState={
    cart:{cartItems:cartItemsFromStorage},
    userLogin:{userInfo:userInfoFromStorage}
};

```

登录页面及功能实现

```jsx

const LoginView = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const location=useLocation();
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin

    const redirect=location.search?location.search.split("=")[1]:"/"
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,redirect])
    // 表单提交
    const submitHandler=(e)=>{
        e.preventDefault()
        // dispatch login函数
        dispatch(login(email,password))
    }
  return (
    <FormContainer>
        <h1>Login</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                type="email"
                placeholder='please input your email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                type="password"
                placeholder='please input your password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}>
                    
                </Form.Control>
                
            </Form.Group>
            <Button  style={{margin:"1rem 0rem 0rem "}} type="submit" variant="primary">Login</Button>
        </Form>
        <Row className='py-3'>
            <Col>
            New user? ☞ <Link to={redirect?`/register?redirect=${redirect}`:
            "/register"
        }>Go to register</Link></Col>
        </Row>
    </FormContainer>
  )
}

```

用户登录成功时，导航栏登录变为账号名称，下拉显示个人中心和退出

```js
// 点击退出当前用户
// action
// 用户推出
export const logout=()=>(dispatch)=>{
    localStorage.removeItem("userInfo");
    dispatch({type:USER_LOGOUT})
}
```

## 用户注册

```js
// 用户注册reducer
export const userRegisterReducer=(state={},action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading:false,userInfo:action.payload};
        case USER_REGISTER_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

// 用户注册Action
export const register=(name,email,password)=>async(dispatch)=>{
    try {
        dispatch({type:USER_REGISTER_REQUEST});
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const {data}=await axios.post("/api/users",{name,email,password},config);
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        dispatch({type:USER_LOGIN_SUCCESS,payload:data});
        localStorage.setItem("userInfo",JSON.stringify(data))
    } catch (error) {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}
```

用户资料更新（后端）---controller控制器

```js
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


```

路由注册，并验证

```js
router.route("/profile")
    .get(protect,getUserProfile)
    .put(protect,updateUserProfile)
```

## 用户详情

```js
// reducer
// 用户详情reducer
export const userDetailsReducer=(state={},action)=>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {loading:true,...state};
        case USER_DETAILS_SUCCESS:
            return {loading:false,user:action.payload};
        case USER_DETAILS_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

// store
const reducer=combineReducers({
    // ...,
    userDetails:userDetailsReducer
})

// action
// 用户详情Action
export const getUserDetails=(id)=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_DETAILS_REQUEST});
        // 获取登录成功后的用户信息
        const {
            userLogin:{userInfo},
        }=getState

        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}=await axios.get(
            `/api/users${id}`,
            config);
        dispatch({type:USER_DETAILS_SUCCESS,payload:data});

    } catch (error) {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}
```

更新用户详情

```js
// 更新用户详情reducer
export const userUpdateDetailsReducer=(state={},action)=>{
    switch(action.type){
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading:true};
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading:false,userInfo:action.payload,success:true};
        case USER_UPDATE_PROFILE_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;
    }
}

// store中引入

// action
// 更新用户详情Action
export const updateUserDetails=(user)=>async(dispatch,getState)=>{
    try {
        dispatch({type:USER_UPDATE_PROFILE_REQUEST});
        // 获取登录成功后的用户信息
        const {
            userLogin:{userInfo},
        }=getState()

        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data}=await axios.put(
            `/api/users/profile`,user,
            config);
        dispatch({type:USER_UPDATE_PROFILE_SUCCESS,payload:data});

    } catch (error) {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}

// 前端提交
// 表单提交(更新用户资料)
const submitHandler=(e)=>{
    e.preventDefault()
    // dispatch update profile函数
   	dispatch(updateUserDetails({id:user._id,name,email,password}))
    dispatch(getUserDetails("profile"));
}  
```

用户资料重置

## ！异步问题

拿不到最新的redux状态值导致无法在初始化刷新时进行正确的操作

# 结账流程

# 后台界面

## 图片文件上传

```
npm i multer
```

## 数据库表的关联

```js
//@desc    获取所有订单
//@route   GET/api/orders
//@access  私密(仅限管理员)
const getOrders = asyncHandler(async (req, res) => {
  // 查询order表所有数据，然后级联查找，user表的id和name
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})
```

## 使用uuid创建id

```
npm i uuid

import { v4 as uuidv4 } from 'uuid'
uuidv4()
```

# PayPal支付

```
// 账户
https://developer.paypal.com/dashboard/accounts

//创建相应app
https://developer.paypal.com/dashboard/applications/sandbox

// 获取client Id

// 插入脚本
https://developer.paypal.com/sdk/js/configuration/


paypal样式组件
react-paypal-button-v2
npmjs.com/package/react-paypal-button-v2

```

# Morgan

```js
// 日志记录
// server中
import morgan from 'morgan'

if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'))
}

// 控制台打印
[0] GET /api/orders 200 50.521 ms - 2964
[0] GET /api/orders/63e34f71f34d7e14fe3bdb42 304 10.929 ms - -
[0] PUT /api/orders/63e34f71f34d7e14fe3bdb42/deliver 200 19.363 ms - 729
[0] GET /api/orders/63e34f71f34d7e14fe3bdb42 200 8.449 ms - 776
[0] GET /api/orders 200 6.801 ms - 3004
```

