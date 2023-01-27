import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import {Row,Col,Image,ListGroup,Card,Button, Form,ListGroupItem} from "react-bootstrap"


const CartViews = () => {
     const params=useParams();
     const location=useLocation();
     const qty=location.search?Number(location.search.split("=")[1]):1;
    //   console.log(qty)
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.cart);
    // console.log(cart);
    const {cartItems}=cart
    useEffect(()=>{
        if(params.id){
            dispatch(addToCart(params.id,qty));
        }
    },[dispatch,params,qty])

    // 删除购物车中商品
    const removeFromCartHandler=(id)=>{
        // console.log("已经删除")
        dispatch(removeFromCart(id))
    }
    // 去支付
    const checkoutHandler=()=>{

    }
    return (
        <Row style={{padding:" 0.5rem 6rem"}}>
            <Col md={7}>
                <h2>购物车</h2>
                {cartItems.length===0?
                <Message variant="secondary">购物车为空！<Link to="/">返回主页</Link></Message>:(
                    <ListGroup variant="flush">
                        {cartItems.map(item=>
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}><Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>{item.price}</Col>
                                    <Col md={2}>
                                    <Form.Control 
                                        as="select" 
                                        value={item.qty}
                                        onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}
                                            >
                                         {[...Array(item.countInStock).keys()].map(i=>
                                            <option 
                                             key={i+1} 
                                             value={i+1}>
                                                {i+1}
                                            </option>
                                         )}
                                              </Form.Control>
                                    </Col>
                                    <Col><Button type="button"
                                      onClick={()=>removeFromCartHandler(item.product)}

                                    >
                                        <i className='fas fa-trash'></i></Button></Col>
                                </Row>
                            </ListGroup.Item>
                            )}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h4>共计({cartItems.reduce((acc,item)=>acc+item.qty,0)})个商品</h4>
                            ￥{cartItems.reduce((acc,item)=>acc+item.qty*item.price,0)}
                        </ListGroup.Item>
                        <ListGroup.Item className='d-grid gap-2'>
                            <Button type="button" className='btn-block' 
                            disabled={cartItems.length===0}
                            onClick={checkoutHandler}
                            >去支付</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartViews