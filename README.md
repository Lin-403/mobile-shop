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

