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
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { Link } from 'react-router-dom';
import Meta from '../components/Meta';

function HomeView() {
  const params=useParams();
  const keyword=params.keyword
  const pageNumber = params.pageNumber || 1

  const dispatch=useDispatch();
  const productList=useSelector((state)=>state.productList);
  const {loading,error,products, pages, page}=productList;

  useEffect(() => {
  
    dispatch(listProducts(params.keyword,pageNumber))
   
  },[dispatch, keyword,pageNumber])
  return (
    <>
    <Meta />
    {!keyword ? (
        <div style={{width:"86%",marginLeft:"7%"}}>
          <ProductCarousel />
        </div>
      ) : (
      <Link to='/' className='btn btn-dark'>
      返回上一页
    </Link>
  )}
      <h2 style={{padding:"0.5rem 6rem"}}>最新产品</h2>
      {loading?(
        <Loader />
      ):(error?(
        <div style={{width:"86%",marginLeft:"7%"}}>
           <Message variant="danger">{error}</Message>
        </div>
       
        ):(
          <>
          <Row style={{padding:"0 6rem"}}>{products.map(product=>(
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product  product={product}/>
          </Col>
          ))}</Row>
          <Paginate pages={pages} page={page} keyword={keyword?keyword:""} />
          
          </>
        ))}
    </>
  )
}

export default HomeView