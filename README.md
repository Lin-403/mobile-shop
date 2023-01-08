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

