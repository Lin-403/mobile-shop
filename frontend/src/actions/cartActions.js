import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../contents/cartConstents";


export const addToCart=(id,qty)=>async(dispatch,getState)=>{
  const {data}=await axios.get(`/api/products/${id}`);
  dispatch({
    type:CART_ADD_ITEM,
    payload:{
        product:data._id,
        name:data.name,
        image:data.image,
        price:data.price,
        countInStock:data.countInStock,
        qty,
    }
  })
  // 数据进行本地存储，防止下次访问请求过慢
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

// 删除产品action
export const removeFromCart=(id)=>async(dispatch,getState)=>{
  dispatch({
    type:CART_REMOVE_ITEM,
    payload:id,
  })
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}