import { Button, Checkbox, message } from 'antd';
import React, { useEffect } from 'react'
import { } from 'antd';
import {Image,Container,Row,Col,Navbar,Nav, NavDropdown, ListGroup, Card} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Message from './Message';
import { createOrder } from '../actions/orderActions';


const PlaceorderView = () => {
  const dispatch=useDispatch()               
  const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
  }
  const cart=useSelector(state=>state.cart)
  cart.itemsPrice=addDecimals(cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0))
  cart.shippingPrice=addDecimals(cart.itemsPrice>5000?0:20)
  const navigate=useNavigate()
  cart.totalPrice=addDecimals(Number(cart.itemsPrice)+Number(cart.shippingPrice))
  const {order,success,error}=useSelector(state=>state.orderCreate)
  const location=useLocation()
  const placeorderHandle=()=>{
    // console.log("tijiao")
    dispatch(
      createOrder({
        orderItems:cart.cartItems,
        shippingAddress:cart.shippingAddress,
        paymentMethod:cart.paymentMethod,
        itemsPrice:cart.itemsPrice,
        shippingPrice:cart.shippingPrice,
        totalPrice:cart.totalPrice
      })
    )
    message.success("订单提交成功")
  }
  return (
    <Row >
      <Col  md={7}>
        <ListGroup  variant="flush">
          <ListGroup.Item >
            <h5 style={{marginTop:"10px"}}>收货地址</h5>
            <p style={{marginBottom:"2px"}}><strong>收货人地址：</strong>{cart.shippingAddress.province},{cart.shippingAddress.city},{cart.shippingAddress.address}</p>
            <p><strong>收货人邮编：</strong>{cart.shippingAddress.postalCode}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>支付方式</h5>
            <p><strong>支付方法：</strong>{cart.paymentMethod}</p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h5>产品订单</h5>
            {cart.cartItems.length===0?(
              <Message>购物车为空</Message>
              ):(
                <ListGroup variant="flush">
                  {cart.cartItems.map((item,index)=>(
                      <Row key={item.product}>
                        <Col md={3}>
                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                        </Col>
                        <Col md={4} style={{paddingTop:"25px",paddingLeft:"0px"}}>
                        <Link to={`/product/${item.product}`} >{item.name}</Link>
                        </Col>
                        <Col style={{paddingTop:"25px",paddingLeft:"0px"}} md={5}>
                          {item.qty} x {item.price}={item.qty*item.price}
                        </Col>
                      </Row>
                  ))}
                </ListGroup>
              )}
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={5} >
        <Card>
        <ListGroup variant="flush">
          <ListGroup.Item style={{marginLeft:"0"}}>
            <h2 >订单详情</h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>产品总价</Col>
              <Col>$ {cart.itemsPrice}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>运费</Col>
              <Col>$ {cart.shippingPrice}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>订单总价</Col>
              <Col>$ {cart.totalPrice}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button  type="primary"  block
            onClick={placeorderHandle} disabled={cart.cartItem===0}>
            提交订单</Button>
          </ListGroup.Item>
        </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default PlaceorderView