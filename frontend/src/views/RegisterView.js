import React,{useState,useEffect} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Form,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector,connect} from "react-redux";
import FormContainer from '../components/FormContainer';
import { login, register } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {message} from "antd"


const RegisterView = ({error}) => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    
    const location=useLocation();
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const userRegister=useSelector(state=>state.userRegister)
    const {loading,userInfo}=userRegister
    // const [obj,setObj]=useState({});
    var obj={}
    var [str,setStr]=useState("")
   
    if(error){
        let arr=error.split(",");
        arr[0]=arr[0].slice(23,-1)

        arr.map(item=>item.slice(1,-1)).map(item=>{
            item=item.split(":");
            // console.log(item[0])
            obj[item[0]]=item[1];
            // return {item[0],item[1]};
        })
        // setObj[obj]
        console.log(obj)
    }

    const redirect=location.search?location.search.split("=")[1]:"/"
    useEffect(()=>{
        if(userInfo){
            message.success("Register Successfully!")
            navigate(redirect)
        }

    },[userInfo,redirect])
    // 表单提交
    const submitHandler=async(e)=>{
        // if(error&& )
        e.preventDefault()
        // dispatch register函数
        // dispatch(register(name,email,password))
        if(password!==confirmPassword){
            message.error("The password and Confirm password fields do not match.")
        }
        else {
            await dispatch(register(name,email,password))
            // useInfo &&  message.success("Register Successfully!")
        }
        // if(str===""&&error==="User already exist!"){
        //     message.error(error)
        //     setStr(error)
        // }
        // str=""
    }   
  return (
    <FormContainer>
        <h1>Register</h1>
        {error==="User already exist!" && <Message variant={"danger"}>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
           <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                type="name"
                placeholder='please input your name'
                value={name}
                onChange={(e)=>setName(e.target.value)}>

                </Form.Control>
                {
                !name && (
                    Object.keys(obj).includes("name") && (<Form.Text style={{color:"#FF6264"}} >
                    {obj["name"]}
                </Form.Text>)
                )
                }
            </Form.Group>
            <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                type="email"
                placeholder='please input your email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>

                </Form.Control>
                {
                    !email &&(
                        Object.keys(obj).includes("email") && (<Form.Text style={{color:"#FF6264"}} >
                    {obj["email"]}
                </Form.Text>)
                    )
                }
            </Form.Group>
            <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='password'>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                type="password"
                placeholder='please input your password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}>
                    
                </Form.Control>
                {
                    !password && (Object.keys(obj).includes("password") && (<Form.Text style={{color:"#FF6264"}} >
                    {obj["password"]}
                </Form.Text>))
                }
            </Form.Group>
            <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='confirmPassword'>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                type="password"
                placeholder='please input your password again'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}>
                </Form.Control>
                {
                    !confirmPassword && (Object.keys(obj).includes("password") && (<Form.Text style={{color:"#FF6264"}} >
                    {obj["password"]}
                </Form.Text>))
                }
            </Form.Group>
            <Button  style={{margin:"1rem 0rem 0rem "}} type="submit" variant="primary">Register</Button>
        </Form>
        <Row className='py-3'>
            <Col>
            Have an account? ☞ <Link to={redirect?`/login?redirect=${redirect}`:
            "/login"
        }>Go to login</Link></Col>
        </Row>
    </FormContainer>
  )
}

const mapStateToProps=(state)=>{
    // console.log(state)
    return({
        error:state.userRegister.error
    })
}

export default  connect(mapStateToProps)(RegisterView)