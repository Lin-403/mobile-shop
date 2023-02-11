import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../actions/productActions';
import Loader from './Loader';
import Message from './Message';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
const contentStyle = {
    margin: 0,
    height: '320px',
    color: '#fff',
    lineHeight: '320px',
    textAlign: 'center',
    background: '#3d7569',
    
  };
const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated
  
    useEffect(() => {
      dispatch(listTopProducts())
    }, [dispatch])

    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
  return loading ? (
    <Loader />
  ) : (
    <Carousel autoplay afterChange={onChange}>
      {
        products.map(product=>(
         <div key={product._id} style={{
            backgroundColor:"#979797"
         }}>
            <Link style={{
                    color:"white",
                    textDecoration:"none"
                }} to={`/products/${product._id}`}>
                <div style={contentStyle}>
                    <h4 style={{
                        color:"white",
                        textDecoration:"none"
                    }}>
                        {product.name} (¥{product.price})
                    </h4> 
                    <div style={{
                            margin:"auto",
                            borderRadius:"50%",
                            height:"200px",
                            width:"200px",
                            backgroundColor:"white"
                        }}>
                        <Image style={{
                            margin:"auto",
                            borderRadius:"50%",
                            height:"200px"
                        }} src={product.image} alt={product.name}  />
                    </div>
                </div>
        
          </Link>
         </div>
        ))
      }
     
    </Carousel>
  )
}

export default ProductCarousel