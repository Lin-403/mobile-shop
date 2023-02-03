import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productCreateReducer, productDeleteReducer, productLDetailsReducer, productListReducer, productUpdateReducer } from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import {   userListReducer, userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateDetailsReducer, userDeleteReducer, updateUserReducer } from "./reducers/userReducers.js";
import { orderCreateReducer, orderDetailsReducer } from "./reducers/orderReducers.js";

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productLDetailsReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    cart:cartReducers,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateDetailsReducer,
    userList:userListReducer,
    userUpdate:updateUserReducer,
    userDelete:userDeleteReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    
})

// 初始化获取本地存储的购物车信息
const cartItemsFromStorage=localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: []

// 获取本地存储的登录用户信息
const userInfoFromStorage=localStorage.getItem("userInfo")?
JSON.parse(localStorage.getItem("userInfo")):null;

// 获取本地存储的用户地址信息
const shippingAddressStorage=localStorage.getItem("shippingAddress")?
JSON.parse(localStorage.getItem("shippingAddress")):{};


// console.log(userInfoFromStorage)
const initialState={
    cart:{cartItems:cartItemsFromStorage,
    shippingAddress:shippingAddressStorage
    },
    userLogin:{userInfo:userInfoFromStorage}
};

const middleware=[thunk];

// 创建store
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store;