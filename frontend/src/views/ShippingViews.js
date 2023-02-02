import React, { useState } from 'react'
// import { Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Button,Checkbox, Form, Input, message, Steps, theme } from 'antd';
import ShippingAddress from '../components/ShippingAddress';
import {useDispatch, useSelector} from "react-redux"
import Payment from '../components/Payment';
import { Placeholder } from 'react-bootstrap';
import PlaceorderView from '../components/PlaceorderView';
import { useNavigate } from 'react-router-dom';
import { getOrderDetails } from '../actions/orderActions';



const ShippingViews = () => {
  const dispatch=useDispatch()
  const cart=useSelector(state=>state.cart)
  const {shippingAddress}=cart;
  const orderCreate=useSelector(state=>state.orderCreate)
  const {order}=orderCreate
  const navigate=useNavigate()
  const steps = [
    {
      title: '填写收货地址',
      content: <ShippingAddress shippingAddress={shippingAddress} />,
    },
    {
      title: '选择支付方式',
      content: <Payment/>,
    },
    {
      title: '提交订单',
      content: <PlaceorderView/>
    },
  ];
  const handleDone=()=>{
      if(order){
        navigate(`/order/${order._id}`)
        dispatch(getOrderDetails(order._id))
        message.success("订单已经创建成功")
      }
  }
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
      if(current===0){
        if(Object.keys(cart.shippingAddress).length!==0){
          setCurrent(current + 1);
        }
        else message.error("未填写收获地址并保存！")
      }
      else if(current===1){
        if(cart.paymentMethod){
          setCurrent(current+1)
        }
        else message.error("未确认选择支付方式！")
      }
      // if(current===1)
    };
    const prev = () => {
      setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
      key: item.title,
      title: item.title,
    }));
    const contentStyle = {
    //   lineHeight: '260px',
      // textAlign: 'center',
      color: token.colorTextTertiary,
      // backgroundColor: token.colorFillAlter,
      borderRadius: token.borderRadiusLG,
      border: `1px dashed ${token.colorBorder}`,
      marginTop: 16,
      padding:15
    };

  return (
    <FormContainer>
         <>
      <Steps style={{color:"red"}} current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => handleDone()}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>

    </FormContainer>
  )
}

export default ShippingViews


{/* <h2>收货地址</h2>
<Form onSubmit={submitHandler}>
<Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='address'>
        <Form.Label>详细地址：</Form.Label>
        <Form.Control 
        type="text"
        placeholder='请输入详细地址'
        value={address}
        onChange={(e)=>setAddress(e.target.value)}>
        </Form.Control>
    </Form.Group>
<Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='city'>
        <Form.Label>所在地区：</Form.Label>
        <Form.Control 
        type="text"
        placeholder='请输入所在地区'
        value={city}
        onChange={(e)=>setCity(e.target.value)}>
        </Form.Control>
    </Form.Group>
    <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='postalCode'>
        <Form.Label>邮政编码：</Form.Label>
        <Form.Control 
        type="text"
        placeholder='请输入邮政编码'
        value={postalCode}
        onChange={(e)=>setPostalCode(e.target.value)}>
        </Form.Control>
    </Form.Group>
    <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='province'>
        <Form.Label>所在省份：</Form.Label>
        <Form.Control 
        type="text"
        placeholder='请输入所在省份'
        value={province}
        onChange={(e)=>setProvince(e.target.value)}>
        </Form.Control>
    </Form.Group>
</Form> */}