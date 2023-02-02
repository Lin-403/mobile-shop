import { Button, Checkbox, message } from 'antd';
import React, { useEffect } from 'react'
import {Image,Container,Row,Col,Navbar,Nav, NavDropdown, ListGroup, Card} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { createOrder, getOrderDetails } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const OrderView = () => {
    const params=useParams();
    const dispatch=useDispatch()
    // useEffect(() => {
    //     dispatch(getOrderDetails(params.id))
    // }, [])
    const orderDetails=useSelector(state=>state.orderDetails)
    const {loading,error,order}=orderDetails

   
    useEffect(() => {
        // console.log(params.id);
        if(!order||order._id!==params.id){
            dispatch(getOrderDetails(params.id))
        }
      },[dispatch,params,order])

    return (
        Object.keys(order).length===0?<Loader/>:error?message.error(error):<>
        <h2>订单号：{order._id}</h2>
        <Row md={10}>
        <Col  md={6}>
            <ListGroup  variant="flush">
            <ListGroup.Item >
                <h5 style={{marginTop:"10px"}}>收货地址</h5>
                <p style={{marginBottom:"2px"}}>
                    <strong>收货人姓名：</strong> {order.user.name}
                </p>
                <p style={{marginBottom:"2px"}}> 
                    <strong>收货人邮箱：</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p style={{marginBottom:"2px"}}><strong>收货人地址：</strong>
            
                {order.shippingAddress.province},{order.shippingAddress.city},{order.shippingAddress.address}</p>
                <p><strong>收货人邮编：</strong>{order.shippingAddress.postalCode}</p>
                {order.isDelivered?(<Message variant="success">发货时间：{order.DeliveredAt}</Message>):(
                    <Message variant="secondary">未发货</Message>
                )}
            </ListGroup.Item>
            <ListGroup.Item>
                <h5>支付方式</h5>
                <p><strong>支付方法：</strong>{order.paymentMethod}</p>
                {order.isPaid?(<Message variant="success">支付时间：{order.PaidAt}</Message>):(
                    <Message variant="secondary">未支付</Message>
                )}
            </ListGroup.Item>
            <ListGroup.Item>
                <h5>产品订单</h5>
                {order.orderItems.length===0?(
                <Message>购物车为空</Message>
                ):(
                    <ListGroup variant="flush">
                    {order.orderItems.map((item,index)=>(
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
                <Col>$ {order.itemsPrice}</Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                <Col>运费</Col>
                <Col>$ {order.shippingPrice}</Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                <Col>订单总价</Col>
                <Col>$ {order.totalPrice}</Col>
                </Row>
            </ListGroup.Item>
            </ListGroup>
            </Card>
        </Col>
        </Row>
        </>
        // <></>
    )
}

export default OrderView