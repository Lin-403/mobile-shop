import React from 'react'
import {Row,Col} from "react-bootstrap"
import Product from '../components/Product'
import products from "../products"

function HomeView() {
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