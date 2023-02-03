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



const UserEditView = () => {
    const params=useParams()
    const userId=params.id;
    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    
    const [isAdmin,setIsAdmin]=useState(true);

    // const location=useLocation();
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails
    const userUpdate=useSelector(state=>state.userUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=userUpdate
   
    // var obj={}
    const redirect=location.search?location.search.split("=")[1]:"/"
    useEffect(()=>{
       if(successUpdate){
        dispatch({type:USER_UPDATE_RESET});
        navigate("/admin/userlist");
       }
       else {
        if(!user.name||user._id!==userId){
            console.log("-----------")
            dispatch(getUserDetails(userId));
        }
        else {
            console.log("============")
            console.log(user)
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
       }
    },[dispatch,user,userId,successUpdate,loading])
    // 表单提交
  
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(name,isAdmin)
        dispatch(updateUser({_id:userId,name,email,isAdmin}))
      };
      
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <FormContainer>
        <Button onClick={()=>{
            navigate("/admin/userlist");
            // dispatch({type:USER_UPDATE_RESET})
            // dispatch({type:USER_DETAILS_RESET})
        }} type="primary" size="large" style={{width:"5rem",marginBottom:"10px"}}>Back</Button>
        <h1 style={{marginBottom:"35px"}}>Edit</h1>
        {loading ? <Loader/>:error?<Message variant="danger">{error}</Message>:(
           <>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={
                {
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin
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
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            >
            <Input/>
            </Form.Item>

            <Form.Item name="isAdmin" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox onChange={()=>{
                console.log(isAdmin)
                setIsAdmin(!isAdmin)
              }}>Is Admin</Checkbox>
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


export default  UserEditView