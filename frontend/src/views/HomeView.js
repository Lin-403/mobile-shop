import React,{useState,useEffect} from 'react'
import {Row,Col} from "react-bootstrap"
import Product from '../components/Product'
// import products from "../products"
// import axios from "axios"
import {useDispatch,useSelector} from "react-redux"
import { listProducts } from '../actions/productActions';
import {connect} from "react-redux";
import Loader from '../components/Loader';
import Message from '../components/Message';

function HomeView() {
  const dispatch=useDispatch();
  const productList=useSelector((state)=>state.productList);
  const {loading,error,products}=productList;

  useEffect(() => {
   if(products.length===0){
    dispatch(listProducts())
   }
  },[dispatch])
  return (
    <>
      <h2 style={{padding:"0.5rem 6rem"}}>最新产品</h2>
      {loading?(
        <Loader />
      ):(error?(
        <Message variant="danger">{error}</Message>
        ):(
          <Row style={{padding:"0 6rem"}}>{products.map(product=>(
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product  product={product}/>
          </Col>
          ))}</Row>
        ))}
    </>
  )
}

export default HomeView