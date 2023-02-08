import React,{useState,useEffect, useRef} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch,useSelector,connect} from "react-redux";
import FormContainer from '../components/FormContainer';
import { getUserDetails, login, register, updateUser } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {message,  Upload,} from "antd"
import { PlusOutlined } from '@ant-design/icons';

import { Button, Checkbox, Form, Input } from 'antd';
import { useParams } from 'react-router-dom';
import { USER_DETAILS_RESET, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from '../contents/userContents';
import { listProductsDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../contents/productConstents';
import axios from 'axios';



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
    const [uploading,setUploading]=useState(false);

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
        if(!product.name||product._id!==productId){
            dispatch(listProductsDetails(productId));
        }
        else {
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
    //处理文件上传
    const uploadFileHandler = async (e) => {
      //获取用户选择上传的文件
      
    }
    const ref=useRef()
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

      const normFile = async(e) => {
        console.log('Upload event:', e);
        const file = e.target.files[0]
        //实例化formdata表单数据对象
        const formData = new FormData()
        formData.append('image', file)
        console.log(formData.get("image"))
        setUploading(true)
        try {
          const config = {
            headers: {
              'Content-Type': 'multerpart/form-data',
            },
          }
          const { data } = await axios.post('/api/upload', formData, config)
          console.log(data)
          // setImage(data)

          ref.current?.setFieldsValue({ image:data });
          setUploading(false)
        } catch (error) {
          // console.log(JSON.parse(error.request.response).message)
          setUploading(false)
          message.error(JSON.parse(error.request.response).message)
        }

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
            ref={ref}
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
            //  valuePropName={image}
            rules={[{ required: true, message: 'Please input your image!' }]}
            >
            <Input/>
            </Form.Item>
              <Form.Item label="Upload" valuePropName="fileList" onChange={normFile}>
                <Upload listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
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