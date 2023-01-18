import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from "react-bootstrap"
import products from "../products"
import Rating from '../components/Rating'
import axios from "axios"

const ProductView = () => {
    const [product,setProduct]=useState({});
    const params=useParams();
    useEffect(() => {
        // console.log("hello");
        const fetchProduct=async()=>{
          const {data}=await axios.get(`/api/products/${params.id}`);
          setProduct(data)
        }
        fetchProduct();
      },[params])
    return (
        <>
        <Link className='btn btn-dark my-3' to="/">
            返回主页
        </Link>
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
        </>
    )
}

export default ProductView