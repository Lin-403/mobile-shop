import React, { useEffect } from 'react'
import { Button, message, Space, Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, getUserList } from '../actions/userActions';
import {
    EditOutlined,
    EditTwoTone,
    DeleteTwoTone,
  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';
import { Link } from 'react-router-dom';

  
const OrderListView = () => {
    const orderList=useSelector(state=>state.orderList);
    const {loading,error,orders}=orderList
    const dispatch=useDispatch()
    const userInfo=useSelector(state=>state.userLogin).userInfo

    var data=[];
    console.log(orders)
    !loading && orders.map((item,index)=>{
        data.push({
            key:index,
            id:item._id,
            name:item.user.name,
            time:item.createdAt.substring(0, 10),
            totalPrice:item.totalPrice,
            createdAt:item.createdAt.substring(0, 10),
            isPaid:item.isPaid,
            isDelivered:item.isDelivered,
            paidAt:item.isPaid && item.paidAt,
            deliveredAt:item.isDelivered && item.deliveredAt
        })
    })
    const navigate=useNavigate()

    
    useEffect(()=>{
     if(userInfo && userInfo.isAdmin){
      dispatch(listOrders());
     }
     else {
      navigate("/login")
     }
   },[dispatch,navigate,userInfo])
   
   const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    //   render: (text) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
           <Link style={{textDecoration:"none"}} to={`/order/${record.id}`}>查看订单</Link>
        </Button>
         </>
      ),
    },
  ];
  return (
  <>
  <h2>订单列表</h2>
 {loading?<Loader/>:(
   
   <Table pagination={{
                     pageSize: 5
                 }} columns={columns} dataSource={data} />
 )}
  </>

  )
}

export default OrderListView