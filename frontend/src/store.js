import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productLDetailsReducer, productListReducer } from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productLDetailsReducer,
    cart:cartReducers,
})

// 初始化获取本地存储的购物车信息
const cartItemsFromStorage=localStorage.getItem("cartItems")
? JSON.parse(localStorage.getItem("cartItems"))
: []

const initialState={
    cart:{cartItems:cartItemsFromStorage},
};

const middleware=[thunk];

// 创建store
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store;