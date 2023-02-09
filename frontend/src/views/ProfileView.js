import React,{useState,useEffect} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import { Button, Form,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import { getUserDetails, login, register, updateUserDetails } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { USER_UPDATE_PROFILE_RESET } from '../contents/userContents';
// import {message} from "antd"
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { contentQuotesLinter } from '@ant-design/cssinjs/lib/linters';
import store from '../store';
import {message, Space, Table, Tag } from 'antd';
import { listMyOrders } from '../actions/orderActions';

const ProfileView = () => {
    // console.log(history)
    const [name,setName]=useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    // const [message,setMessage]=useState(null)
    
    const location=useLocation();
    // console.log(location)
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user}=userDetails
    // console.log(userDetails)
    // 获取登录相关信息
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    console.log(error)
    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile

    const orderListMy=useSelector(state=>state.orderListMy);
    const {loading:loadingMy,error:errorMy,orders}=orderListMy
    console.log(orders)
    const { confirm } = Modal;
    const showDeleteConfirm = (e) => {
        // dispatch({type:USER_UPDATE_PROFILE_RESET})
        console.log(store.getState().userUpdateProfile)
        const err=userUpdateProfile.error
        e.preventDefault()
        if(!success && err){
            console.log("1111111111111")
            message.error("The user has been used!")
        }
        else {
            confirm({
                title: 'Are you sure update this task?',
                icon: <ExclamationCircleFilled />,
                content: 'Thinking carefully!',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                  // e.preventDefault()
                  if(userUpdateProfile.error){
                    message.error("The user has been used!")
                  }
                  else{
                    submitHandler()
                  console.log(store.getState().userUpdateProfile)
                  message.success("Update successfully!")
                  dispatch({type:USER_UPDATE_PROFILE_RESET})
                  }

                },
                onCancel() {
                  console.log('Cancel');
                },
              });
        } 
      };
    useEffect(()=>{
        
    // dispatch(updateUserDetails({}));
        if(!userInfo){
            navigate("/login")
        }
        else {
            if(!user.name){
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders())
            }
            else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    },[userInfo,user,dispatch,location.pathname])
    // 表单提交(更新用户资料)
    const submitHandler=()=>{
        console.log("--------------")
        
        // dispatch update profile函数
        if(password!==confirmPassword){
            message.error("The password and Confirm password fields do not match.")
        }
        else {
            dispatch(updateUserDetails({id:user._id,name,email,password}))
        }
    }   
    var data=[];
    !loadingMy && orders.map((item,index)=>{
        data.push({
            key:index,
            id:item._id,
            name:item.user.name,
            time:item.createdAt.substring(0, 10),
            totalPrice:item.totalPrice,
            createdAt:item.createdAt.substring(0, 10),
            isPaid:item.isPaid,
            isDelivered:item.isDelivered,
            paidAt:item.isPaid && item.paidAt.substring(0, 10),
            deliveredAt:item.isDelivered && item.deliveredAt
        })
    })
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        //   render: (text) => <a>{text}</a>,
        },
        {
          title: 'CreatedAt',
          dataIndex: 'createdAt',
          key: 'createdAt',
        },
        {
            title: 'TotalPrice',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
          },
          {
            title: 'IsPaid',
            key: 'isPaid',
            dataIndex: 'isPaid',
            render:(_,record)=>(
              record.isPaid? <Tag color="green">
              {record.paidAt}
            </Tag>:<Tag color="red">
              X
            </Tag>
            )
          },
       
        {
            title: 'IsDelivered',
            key: 'isDelivered',
            dataIndex: 'isDelivered',
            render:(_,record)=>(
              record.isDelivered? <Tag color="green">
              {record.isDelivered}
            </Tag>:<Tag color="red">
              X
            </Tag>
            )
          },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <>
    
            <Button >
               <Link style={{textDecoration:"none",color:"white"}} to={`/order/${record.id}`}>查看订单</Link>
            </Button>
             </>
          ),
        },
      ];
    // submitHandler()
  return (
   <Row style={{margin:"1rem 0rem"}}>
    <Col md={3}>
    <h1>Profile</h1>
    
        {/* {message && <Message variant="danger">{message}</Message>} */}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader/>}
        <Form >
           <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                type="name"
                placeholder='please input your name'
                value={name}
                onChange={(e)=>setName(e.target.value)}>

                </Form.Control>
            </Form.Group>
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
            <Form.Group style={{margin:"1rem 0rem 0rem "}} controlId='confirmPassword'>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                type="password"
                placeholder='please input your password again'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button onClick={showDeleteConfirm} style={{margin:"1rem 0rem 0rem "}} variant="primary">Update</Button>
        </Form>

    </Col>
    <Col style={{padding:"0rem 2rem"}} md={9}>
        <h1>My Order</h1>
        {loading?<Loader/>:(
        <Table pagination={{
                            pageSize: 5
                        }} columns={columns} dataSource={data} />
        )}
    </Col>
   </Row>
  )
}

export default ProfileView