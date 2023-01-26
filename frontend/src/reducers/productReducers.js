import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../contents/productConstents";

export const productListReducer=(state={loading:true,products:[]},action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true,products:[]};
        case PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;

    }
}

export const productLDetailsReducer=(state={loading:true,product:{}},action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true,...state};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false,product:action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;

    }
}