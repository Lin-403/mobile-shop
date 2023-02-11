import {  Checkbox, message,Modal } from 'antd';
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Button,Image,Container,Row,Col,Navbar,Nav, NavDropdown, ListGroup, Card} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
// import { PayPalButton } from 'react-paypal-button-v2'

import { createOrder, deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { v4 as uuidv4 } from 'uuid'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../contents/orderContents';


const OrderView = () => {
    const params=useParams();
    const orderId=params.id
    const dispatch=useDispatch()
    // useEffect(() => {
    //     dispatch(getOrderDetails(params.id))
    // }, [])
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails
  
    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay
    
    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  

    const [image, setImage] = useState('')
    const [text, setText] = useState('请扫码')

      //SDK
     const [SDK, setSDK] = useState(false)

    const handlePayment = () => {
        setIsModalOpen(true);
        // //获取微信返回的支付二维码图片
        axios.post("/code").then(res=>{
          let div = document.createElement('div');
          console.log(res.data)
          div.innerHTML = res.data;
          // div.style='width:150px;height:150px;'
          document.getElementsByClassName('qrcode')[0].appendChild(div);
        })
        // setImage('https://www.thenewstep.cn/pay/index.php?' + 'pid=' + order._id)
        // setShow(true)
        
        // //设置定时器去监听支付
        // let timer = setInterval(() => {
        //   //请求支付status
        //   axios.get('/status').then((res) => {
        //     if (res.data.status === 0) {
        //       setText('请扫码')
        //     } else if (res.data.status === 1) {
        //       setText('您已经完成了扫码，请支付')
        //     } else if (res.data.status === 2) {
        //       //创建支付结果对象
        //       const paymentResult = {
        //         id: uuidv4(),
        //         status: res.data.status,
        //         updata_time: Date.now(),
        //         email_address: order.user.email,
        //       }
        //       //更新完成支付的订单
        //       dispatch(payOrder(orderId, paymentResult))
        //       setText('您已经支付成功，请等待发货')
        //       setShow(false)
        //       clearTimeout(timer)
        //     }
        //   })
        // }, 1000)
      }
      const navigate=useNavigate()
    useEffect(() => {
      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal')
        console.log(clientId)
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
  
        script.onload = () => {
          setSDK(true)
        }
        document.body.appendChild(script)
      }
      if(!userInfo){
        navigate("/login")
      }
        // console.log(params.id);
        if(!order||order._id!==params.id || successPay|| successDeliver){
          dispatch({type:ORDER_PAY_RESET}) 
          dispatch({ type: ORDER_DELIVER_RESET })
          dispatch(getOrderDetails(params.id))
        }else if (!order.isPaid) {
          if (!window.paypal) {
            addPayPalScript()
          } else {
            setSDK(true)
          }
        }
      },[userInfo,dispatch,params,order,orderId,successPay,successDeliver])


      const [isModalOpen, setIsModalOpen] = useState(false);
      const showModal = () => {
       
      };
      const handleOk = () => {
        const paymentResult = {
          id: uuidv4(),
          status: "2",
          updata_time: Date.now(),
          email_address: order.user.email,
        }
        dispatch(payOrder(orderId, paymentResult))
        setIsModalOpen(false);
        message.success("支付成功！")
      };
      const handleCancel = () => {
        setIsModalOpen(false);
        document.getElementsByClassName('qrcode')[0].innerHTML="";
       
      };
        //创建paypal支付btn的函数
      const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
      }
      
      //创建点击发货btn的函数
      const deliverHandler = () => {
        dispatch(deliverOrder(order))
      }
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
                {order.isDelivered?(<Message variant="success">发货时间：{order.deliveredAt}</Message>):(
                    <Message variant="secondary">未发货</Message>
                )}
            </ListGroup.Item>
            <ListGroup.Item>
                <h5>支付方式</h5>
                <p><strong>支付方法：</strong>{order.paymentMethod}</p>
                {order.isPaid?(<Message variant="success">支付时间：{order.paidAt}</Message>):(
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
            {
              userInfo.email===order.user.email && !order.isPaid && order.paymentMethod === 'PayPal' && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!SDK ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  )}
                </ListGroup.Item>
              )
            }
          
            {
              userInfo.email===order.user.email && !order.isPaid && order.paymentMethod === '微信' &&(
<ListGroup.Item className='d-grid gap-2'>
            <Button
                    type='button'
                    className='btn-block'
                    onClick={handlePayment}
                    disabled={order.orderItems === 0}
                  >
                    去支付
                  </Button>
                    <Modal title={`订单号: ${order._id}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <hr/>
                        <p>支付金额：￥{order.totalPrice}</p>
                        <p>支付方式：{order.paymentMethod}</p>
                        <Row>
                        <Col md={6} style={{ textAlign: 'center' }}>
                          <div className='qrcode'></div>
                          <p
                            style={{
                              backgroundColor: '#00C800',
                              color: 'white',
                            }}
                          >
                            {text}
                          </p>
                        </Col>
                        <Col>
                          <Image src='/images/saoyisao.jpg' />
                        </Col>
                      </Row>
                      <hr/>
                    </Modal>
            </ListGroup.Item>
              )
            }
             {/* 发货BTN */}
             {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item className='d-grid gap-2'>
                    <Button
                      type='button'
                      className='btn-block'
                      onClick={deliverHandler}
                    >
                      发货
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
            </Card>
        </Col>
        </Row>
        </>
        // <></>
    )
}

export default OrderView