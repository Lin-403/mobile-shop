import React from 'react'
import {Route ,Routes,Link} from "react-router-dom"
import { Card } from 'react-bootstrap'
import Rating from './Rating'

function Product(props) {
    const {product}=props
    // console.log(product._id,"----",product.rating)
  return (
    <Card className='my-3 py-3 rounded'>
        <Link to={`/products/${product._id}`}>
            <Card.Img src={product.image} variant="top" />
        </Link>
        <Card.Body>
            <Link t={`products/${product._id}`}>
                <Card.Title>{product.name}</Card.Title>
            </Link>
            <Card.Text as="div">
                <Rating value={product.rating} text={`${product.numReviews}条评论`} />
            </Card.Text>
            <Card.Text as="h3">￥{product.price}</Card.Text>
        </Card.Body>
    </Card>
  )
}


export default Product