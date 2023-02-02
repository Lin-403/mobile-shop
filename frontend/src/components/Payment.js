import React, { useEffect, useState } from 'react'
import {Button,Form,message,Radio,Space} from "antd"
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';

const Payment = () => {
  const dispatch=useDispatch()
  const [val,setVal]=useState("微信")
  const onFinish=()=>{
    dispatch(savePaymentMethod(val))
    message.success("已确认支付方式")
  }
  const onChange = (e) => {
    setVal(e.target.value);
  };
  return (
    <Form
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        layout="horizontal"
        style={{ maxWidth: 600,margin:"20px 20px",padding:"0px 10px"}}
        autoComplete="off"
      >
        <Radio.Group defaultValue={"微信"} onChange={onChange}>
          
      <Space style={{fontSize:"18px"}}  direction="vertical">
        <Radio style={{fontSize:"18px"}} value={"微信"}>微信支付</Radio>
        <Radio style={{padding:"20px 0",fontSize:"18px"}} value={"支付宝"}>支付宝支付</Radio>
      </Space>

    </Radio.Group>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Confirm
      </Button>
    </Form.Item>
      </Form>
    
  )
}

export default Payment