import React,{useState,useEffect} from 'react'
import {Row,Col} from "react-bootstrap"
import Product from '../components/Product'
// import products from "../products"
import axios from "axios"

function HomeView() {
  const [products,setProducts] =useState([])
  useEffect(() => {
    // console.log("hello");
    const fetchProducts=async()=>{
      const {data}=await axios.get("/api/products");
      setProducts(data)
    }
    fetchProducts();
  },[])
  return (
    <>
      <h1>最新产品</h1>
      <Row>{products.map(product=>(
        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
        </Col>
      ))}</Row>
    </>
  )
}

export default HomeView