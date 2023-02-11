import React,{useState,useEffect} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, Form,ListGroupItem} from "react-bootstrap"
import products from "../products"
import Rating from '../components/Rating'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { createProductReview, listProductsDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { message } from 'antd'
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DETAILS_RESET } from '../contents/productConstents'
import { Rate } from 'antd';
import { Divider } from 'antd';
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import Meta from '../components/Meta'


const ProductView = () => {
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [editor, setEditor] = useState(null) // 存储 editor 实例

    // 编辑配置
    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
        // uploadImgShowBase64: true,
        
        // https://lin-403.github.io/new-images,
        MENU_CONF: {}
    }
    toolbarConfig.toolbarKeys = [
        // 菜单 key
        'headerSelect',
    
        // 分割线
        '|',
    
        // 菜单 key
        'bold', 'italic', 'emotion',
    ]
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])


    const [qty,setQty]=useState(1);
    const [rating, setRating] = useState(0)
   const [comment, setComment] = useState('<p></p>')
   const [isBlur, setIsBlur] = useState(false)
     const params=useParams();
    const dispatch=useDispatch()
    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // 创建评论的状态
    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {
      loading: loadingProductReview,
      success: successProductReview,
      error: errorProductReview,
    } = productReviewCreate

    useEffect(() => {
        if (successProductReview) {
            alert('评论成功！')
            setRating(0)
            setComment('')
          }
          if (
            !product._id ||
            product._id !== params.id ||
            successProductReview
          ) {
            dispatch({ type: PRODUCT_DETAILS_RESET })
            dispatch(listProductsDetails(params.id))
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
          }
      },[dispatch,params,successProductReview])
    // const product={};

    // 添加商品到购物车
    const navigate=useNavigate()
    const addToCartHandler=()=>{
        const userInfo=localStorage.getItem("userInfo");
        if(userInfo){
            navigate(`/cart/${params.id}?qty=${qty}`)
        message.success("Add to cart Successfully!")
        }
        else {
            message.error("You should to login now!")
            navigate("/login")
        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        console.log(rating,comment)
        dispatch(createProductReview(params.id, { rating, comment }))
      }
    return (
        <>
        <Link className='btn btn-dark my-3' to="/">
            返回主页
        </Link>
        {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
            <>
                       <Meta title={product.name} />

             <Row>
            <Col md={6}><Image src={product.image} alt={product.name} fluid/></Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating
                        value={product.rating} 
                        text={`${product.numReviews}条评论`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        价格：￥{product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        描述：{product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>价格：</Col>
                                <Col>
                                <strong>￥{product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>库存：</Col>
                                <Col>
                                {product.countInStock>0?"有货":"无货"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
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
                        <ListGroup.Item className='d-grid gap-2'>
                            <Button
                             onClick={addToCartHandler}
                            type="button" disabled={product.countInStock===0}>添加到购物车</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        {/* // 评论区域 */}
        <Row >
            <Col >
            <Divider orientation="left"><h2>评论</h2></Divider>
              
             <div style={{width:"90%",marginLeft:"5%"}}>
             {product.reviews && product.reviews.length === 0 && (
                <Message>没有评论</Message>
              )}
             </div>
              <ListGroup variant='flush' style={{}}>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item style={{backgroundColor:"#F4F4F4",borderRadius:"15px",paddingLeft:"10px",width:"90%",marginLeft:"5%",marginBottom:"10px"}} key={review._id}>
                      <div style={{padding:"10px"}}> 
                      <strong style={{color:"#78C2AD"}}>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p style={{color:"#7D7B7B",fontSize:"12px"}}>{review.createdAt.substring(0, 10)}</p>
                      {/* <p>{review.comment}</p> */}
                      <div className='editor-content-view' dangerouslySetInnerHTML={{
                            __html:review.comment
                        }} style={{
                            border:'0px',
                            margin:'0px 0px',
                            overflow:'auto',
                            padding:'0px 0px'
                        }} />
                      </div>

                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                <Divider orientation="left"><h2>创建评论</h2></Divider>
                  
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label style={{marginLeft:"5%"}}>评分：</Form.Label>
                         <span>
                            <Rate 
                            tooltips={desc} 
                            onChange={setRating} 
                            value={rating} />
                            {rating ? <span className="ant-rate-text">{desc[rating - 1]}</span> : ''}
                         </span>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <div style={{ width: '90%', margin: '30px 5%', }}>
                        <>
                            <div style={{ border: '1px solid #ccc', zIndex: 1000 }} >
                                <Toolbar
                                    editor={editor}
                                    defaultConfig={toolbarConfig}
                                    mode="default"
                                    style={{ borderBottom: '1px solid #ccc' }}
                                />
                                <Editor
                                    defaultConfig={editorConfig}
                                    value={comment}
                                    onCreated={setEditor}
                                    onChange={editor => {
                                        setComment(editor.getHtml())
                                    }}
                                    mode="default"
                                    style={{ height: '200px', overflow: 'hidden' }}
                                />
                            </div>
                        </>
                        </div>
                        
                      </Form.Group>
                      <Button style={{marginLeft:"5%"}} type='submit' variant='primary'>
                        提交评论
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      请<Link to='/login'> 登录</Link>后再添加评论?
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
           
        
        )}

        </>
    )
}

export default ProductView