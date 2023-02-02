import React, { useState,useEffect } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingAddress=(props)=>{
  // console.log(props)
  const {shippingAddress}=props
  const dispatch=useDispatch()
  const [address,setAddress]=useState(shippingAddress.address);
  const [city,setCity]=useState(shippingAddress.city?shippingAddress.city:"");
  const [postalCode,setPostalCode]=useState(shippingAddress.postalCode);
  const [province,setProvince]=useState(shippingAddress.province);
  const onFinish = (values) => {
    // console.log("-----------")
    dispatch(saveShippingAddress({address,city,postalCode,province}))
    message.success("保存收货地址成功")
  };
  // useEffect(() => {
  //   console.log(props)
  //   console.log(address)
  // }, [])
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
    return (
      <Form
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 17,
      }}
      style={{
        maxWidth: 600,
        marginTop:30,
        margin:"30 auto"
      }}
      initialValues={{
        address,
        city,
        postalCode,
        province
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Address"
        name="address"
        value={address}
        rules={[
          {
            required: true,
            message: 'Please input your address!',
          },
        ]}
      >
        <Input onChange={(e)=>{setAddress(e.target.value)}} />
      </Form.Item>
  
      <Form.Item
        label="City"
        name="city"
        rules={[
          {
            required: true,
            message: 'Please input your city!',
          },
        ]}
      >
        <Input onChange={(e)=>{setCity(e.target.value)}} />
      </Form.Item>
      <Form.Item
        label="PostalCode"
        name="postalCode"
        rules={[
          {
            required: true,
            message: 'Please input your postalCode!',
          },
        ]}
      >
        <Input onChange={(e)=>{setPostalCode(e.target.value)}} />
      </Form.Item>
      <Form.Item
        label="Province"
        name="province"
        
        rules={[
          {
            required: true,
            message: 'Please input your province!',
          },
        ]}
      >
        <Input  onChange={(e)=>{setProvince(e.target.value)}} />
      </Form.Item>
  
      <Form.Item
      
        wrapperCol={{
          offset: 11,
          span: 16,
        }}
      >
        <Button style={{padding:"auto"}} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
      
    </Form>
    )
}

export default ShippingAddress