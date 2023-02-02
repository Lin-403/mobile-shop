// 创建订单 Action

import axios from "axios";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../contents/orderContents";

export const createOrder=(order)=>async(dispatch,getState) => {
    try {
        dispatch({type:ORDER_CREATE_REQUEST});
        
        // 获取登录成功后的用户信息
        const {
            userLogin:{userInfo},
        }=getState()

        const config={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.post(`/api/orders`,order,config)
        dispatch({type:ORDER_CREATE_SUCCESS,payload:data});
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.message:
            error.message
        })
    }
}

export const getOrderDetails=(id)=>async(dispatch,getState) => {
    try {
        // console.log("----------------------------")
        dispatch({type:ORDER_DETAILS_REQUEST});
        
        // 获取登录成功后的用户信息
        const {
            userLogin:{userInfo},
        }=getState()

        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.get(`/api/orders/${id}`,config)
        console.log(data)
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data});
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.message:
            error.message
        })
    }
}