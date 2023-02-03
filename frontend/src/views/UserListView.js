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

  
const UserListView = () => {
    const userList=useSelector(state=>state.userList);
    const {loading,error}=userList
    const dispatch=useDispatch()
    const userInfo=useSelector(state=>state.userLogin).userInfo
    var data=[];

    userList.users.map((item,index)=>{
        data.push({
            key:index,
            id:item._id,
            name:item.name,
            email:item.email,
            isAdmin:item.isAdmin,
        })
    })
    const navigate=useNavigate()
    const userDelete=useSelector(state=>state.userDelete);
    var {success:successDelete}=userDelete;
    
    useEffect(()=>{
     if(userInfo && userInfo.isAdmin){
      dispatch(getUserList());
     }
     else {
      navigate("/login")
     }
   },[dispatch,navigate,userInfo,userDelete])
   const handleEdit=(e)=>{
    console.log(e.id);
    navigate(`/admin/userlist/${e.id}/edit`);
    // dispatch(getUserDetails(e.id));

   } 


  
   const handleDelete=({id})=>{
    if(window.confirm("Are you sure to delete?")){
      dispatch(deleteUser(id))
      message.success("Delete successfully!")
      
    }
   }
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'IsAdmin',
      key: 'isAdmin',
      dataIndex: 'isAdmin',
      render:(isAdmin)=>(
        isAdmin? <Tag color="green">
        √
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
        <Button 
        disabled={record.isAdmin}
         onClick={()=>(handleEdit(record))} shape='circle' style={{marginRight:"10px"}}>
          <EditTwoTone style={{ fontSize: '20px' }} twoToneColor="#78C2AD" />
        </Button>
        <Button 
        disabled={record.isAdmin}
        onClick={()=>handleDelete(record)} shape='circle' style={{marginRight:"10px"}}>
          <DeleteTwoTone style={{ fontSize: '20px' }} twoToneColor="#F3969A"/>
        </Button>
         </>
      ),
    },
  ];
  return (
  <>
  <h2>用户列表</h2>
 {loading?<Loader/>:(
   
   <Table pagination={{
                     pageSize: 4
                 }} columns={columns} dataSource={data} />
 )}
  </>

  )
}

export default UserListView