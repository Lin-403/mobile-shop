import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../contents/productConstents";
import axios from "axios";

// 获取所有商品的action
export const listProducts=()=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data}=await axios.get("/api/products")
        // console.log(data)
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});

    }
    catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}

// 获取单个商品的action
export const listProductsDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST});
        const {data}=await axios.get(`/api/products/${id}`)
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data});

    }
    catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}

// 删除用户列表Action
export const deleteProduct=(id)=>async(dispatch,getState)=>{
    try {

            dispatch({type:PRODUCT_DELETE_REQUEST});
            // 获取登录成功后的用户信息
            const {
                userLogin:{userInfo},
            }=getState()

            const config={
                headers:{
                    Authorization:`Bearer ${userInfo.token}`
                }
            }

            const {data}=await axios.delete(
                `/api/products/${id}`,
                config);
            dispatch({type:PRODUCT_DELETE_SUCCESS});


    } catch (error) {
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload:error.response && error.response.data.message
            ? error.response.data.message
            :error.message,
        })
    }
}


//创建产品Action
export const createProduct = () => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST})
  
      //获取登录成功后的用户信息
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`/api/products`, {}, config)
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  //更新产品Action
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST })
  
      //获取登录成功后的用户信息
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      )
      console.log(data)
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  //创建产品评论Action
export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    })

    //获取登录成功后的用户信息
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      config
    )
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}