import React,{useState,useEffect} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch,useSelector,connect} from "react-redux";
import FormContainer from '../components/FormContainer';
import { getUserDetails, login, register, updateUser } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {message} from "antd"
import { Button, Checkbox, Form, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { USER_DETAILS_RESET, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from '../contents/userContents';
import { listProductsDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../contents/productConstents';



const ProductEditView = () => {
    const params=useParams()
    const productId=params.id;
    const [name,setName]=useState("")
    const [price,setPrice]=useState(0);
    const [image,setImage]=useState("")
    const [brand,setBrand]=useState("")
    const [category,setCategory]=useState("")
    const [countInStock,setCountInStock]=useState(0)
    const [description,setDescription]=useState("")
    
    const [isAdmin,setIsAdmin]=useState(true);

    // const location=useLocation();
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const productDetails=useSelector(state=>state.productDetails)
    const {loading,error,product}=productDetails
    const productUpdate=useSelector(state=>state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate
   
    // var obj={}
    useEffect(()=>{
       if(successUpdate){
        dispatch({type:PRODUCT_UPDATE_RESET});
        navigate("/admin/productlist");
       }
       else {
        console.log("----")
        if(!product.name||product._id!==productId){
            dispatch(listProductsDetails(productId));
        }
        else {
          console.log("-------------")
          setName(product.name)
          setPrice(product.price)
          setImage(product.image)
          setBrand(product.brand)
          setCategory(product.category)
          setCountInStock(product.countInStock)
          setDescription(product.description)
        }
       }
    },[dispatch,productId,loading,successUpdate])
    // 表单提交
  
    const onFinish = (values) => {
      console.log(values)
        dispatch(updateProduct({
          _id: productId,
          name:values.name,
          price:values.price,
          image:values.image,
          brand:values.brand,
          category:values.category,
          countInStock:values.countInStock,
          description:values.description,
        }))
        message.success("Update successfully!")
      };
     
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  return (
    <FormContainer>
      { loadingUpdate && <Loader />}
        <Button onClick={()=>{
            navigate("/admin/productlist");
            // dispatch({type:USER_UPDATE_RESET})
            // dispatch({type:USER_DETAILS_RESET})
        }} type="primary" size="large" style={{width:"5rem",marginBottom:"10px"}}>Back</Button>
        <h1 style={{marginBottom:"35px"}}>Product-Edit</h1>
        {loading ? <Loader/>:error?<Message variant="danger">{error}</Message>:(
           <>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={
                {
                  name:product.name,
                  price:product.price,
                  image:product.image,
                  brand:product.brand,
                  category:product.category,
                  countInStock:product.countInStock,
                  description:product.description,
                }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
            >
            <Input  />
            </Form.Item>

            <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]}
            >
            <Input/>
            </Form.Item>
            <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: 'Please input your image!' }]}
            >
            <Input/>
            </Form.Item>

            <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: 'Please input your brand!' }]}
            >
            <Input/>
            </Form.Item>

            <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please input your category!' }]}
            >
            <Input/>
            </Form.Item>

            <Form.Item
            label="CountInStock"
            name="countInStock"
            rules={[{ required: true, message: 'Please input your countInShock!' }]}
            >
            <Input/>
            </Form.Item>

            <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
            >
            <Input/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Update
            </Button>
            </Form.Item>
            </Form>

           </>
        )}
    </FormContainer>
  )
}


export default  ProductEditView