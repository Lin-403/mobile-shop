import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from "react-bootstrap"
import products from "../products"
import Rating from '../components/Rating'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { listProductsDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductView = () => {
    const params=useParams();
    const dispatch=useDispatch()
    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails
    useEffect(() => {
        console.log(params.id);
        dispatch(listProductsDetails(params.id))
      },[dispatch,params])
    // const product={};
    return (
        <>
        <Link className='btn btn-dark my-3' to="/">
            返回主页
        </Link>
        {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:(
            <Row>
            <Col md={6}><Image src={product.image} alt={product.name} fluid/></Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating
                        value={product.rating} 
                        text={`${product.numReviews}条评论`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        价格：￥{product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        描述：{product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>价格：</Col>
                                <Col>
                                <strong>￥{product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>库存：</Col>
                                <Col>
                                {product.countInStock>0?"有货":"无货"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-grid gap-2'>
                            <Button type="button" disabled={product.countInStock===0}>添加到购物车</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
        )}

        </>
    )
}

export default ProductView