import React,{useState,useEffect} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Form,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {  message, notification } from 'antd'
import { USER_LOGIN_SUCCESS } from '../contents/userContents';

// import {  message, Space } from 'antd';

const LoginView = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const location=useLocation();
    const navigate=useNavigate()
    const dispatch=useDispatch();
    // const location=useLocation()
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin

    const redirect=location.search?location.search.split("=")[1]:"/"
    useEffect(()=>{
        if(userInfo){
            userInfo && message.success("Welcome to you!")
            navigate(redirect)
        }

    },[userInfo,redirect])
    // 表单提交
    const submitHandler=async(e)=>{
        e.preventDefault()
        // dispatch login函数
        // userInfo && message.success("Welcome to you!")
        dispatch(login(email,password))
     
    }
   
  return (
    <FormContainer>
        <h1>Login</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                type="email"
                placeholder='please input your email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>

                </Form.Control>
            </Form.Group>
            <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                type="password"
                placeholder='please input your password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}>
                    
                </Form.Control>
                
            </Form.Group>
            <Button style={{margin:"1rem 0rem 0rem "}} type="submit" variant="primary">Login</Button>
        </Form>
        <Row className='py-3'>
            <Col>
            New user? ☞ <Link to={redirect?`/register?redirect=${redirect}`:
            "/register"
        }>Go to register</Link></Col>
        </Row>
    </FormContainer>
  )
}

export default LoginView