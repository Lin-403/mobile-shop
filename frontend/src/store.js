import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productLDetailsReducer, productListReducer } from "./reducers/productReducers";

const reducer=combineReducers({
    productList:productListReducer,
    productDetails:productLDetailsReducer
})

const initialState={};

const middleware=[thunk];

// 创建store
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store;