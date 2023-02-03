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
import { createProduct, deleteProduct, listProducts, listProductsDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_RESET } from '../contents/productConstents';


const ProductListView = () => {
    const dispatch=useDispatch()
    const productList=useSelector(state=>state.productList);
    const {products,loading} = productList

    const userInfo=useSelector(state=>state.userLogin).userInfo
    var data=[];
  
    products.map((item,index)=>{
        data.push({
            key:index,
            id:item._id,
            name:item.name,
            price:item.price,
            category:item.category,
            brand:item.brand,
            countInStock:item.countInStock

        })
    })
    const navigate=useNavigate()
    const productDelete=useSelector(state=>state.productDelete);
    var {success:successDelete,loading:loadingDelete,error:errorDelete}=productDelete;
    
    const productCreate=useSelector(state=>state.productCreate);
    var {success:successCreate,
      loading:loadingCreate,
      error:errorCreate,
    product:createProducte}=productCreate;
     
    useEffect(()=>{
      dispatch({type:PRODUCT_CREATE_RESET})
      if(!userInfo.isAdmin){
        navigate("/login")
      }
      if(successCreate){
        // console.log("-----------")
         navigate(`/admin/product/${createProducte._id}/edit`)
      }
      else {
        dispatch(listProducts())
      }
    
   },[dispatch,createProducte,navigate,userInfo,successDelete,successCreate])
   const handleEdit=(e)=>{
    console.log(e.id);
    
    dispatch(listProductsDetails(e.id));
    navigate(`/admin/product/${e.id}/edit`);

   } 

   const handleCreate=()=>{
      dispatch(createProduct())
   }
  
   const handleDelete=({id})=>{
    if(window.confirm("Are you sure to delete?")){
      dispatch(deleteProduct(id))
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
      title: 'ProductName',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Type',
      key: "category",
      dataIndex: "category",
      render:(category)=>(
        <Tag color="green">
        {category}
      </Tag>
      )
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
      },
      {
        title: 'CountInStock',
        dataIndex: 'countInStock',
        key: 'countInStock',
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
         <h2>产品列表 <Button onClick={()=>handleCreate()} style={{ marginLeft: "90%" }} size="large" type="primary" >
          Create
        </Button></h2>
         {loadingCreate && <Loader/>}
         {loadingDelete && <Loader/>}
         {errorDelete && <Message variant="danger" ></Message>}
          {loading?<Loader/>:(
             <Table pagination={{
                pageSize: 5
            }} columns={columns} dataSource={data} />
          )}
  </>

  )
}
  
// const ProductListView = () => {
//     const productList=useSelector(state=>state.productList);
//     const {products}=productList
//     const dispatch=useDispatch()
//     const userInfo=useSelector(state=>state.userLogin).userInfo
//     var data=[];

//     products.users.map((item,index)=>{
//         data.push({
//             key:index,
//             id:item._id,
//             name:item.name,
//             price:item.price,
//             type:item.type,
//             brand:item.brand

//         })
//     })
//     const navigate=useNavigate()
//     const userDelete=useSelector(state=>state.userDelete);
//     var {success:successDelete}=userDelete;
    
//     useEffect(()=>{
//         console.log(userInfo,userInfo.isAdmin)
//      if(userInfo && userInfo.isAdmin){
//         console.log("-------------")
//       dispatch(listProducts());
//      }
//      else {
//       navigate("/login")
//      }
//    },[dispatch,navigate,userInfo,products])
//    const handleEdit=(e)=>{
//     console.log(e.id);
//     navigate(`/admin/userlist/${e.id}/edit`);
//     // dispatch(getUserDetails(e.id));

//    } 


  
//    const handleDelete=({id})=>{
//     if(window.confirm("Are you sure to delete?")){
//       dispatch(deleteUser(id))
//       message.success("Delete successfully!")
      
//     }
//    }
//    const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//     //   render: (text) => <a>{text}</a>,
//     },
//     {
//       title: 'ProductName',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Price',
//       dataIndex: 'price',
//       key: 'price',
//     },
//     {
//       title: 'Type',
//       key: 'type',
//       dataIndex: 'type',
//       render:(type)=>(
//         <Tag color="green">
//         {type}
//       </Tag>
//       )
//     },
//     {
//         title: 'Brand',
//         dataIndex: 'brand',
//         key: 'brand',
//       },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <>
//         <Button 
//         disabled={record.isAdmin}
//          onClick={()=>(handleEdit(record))} shape='circle' style={{marginRight:"10px"}}>
//           <EditTwoTone style={{ fontSize: '20px' }} twoToneColor="#78C2AD" />
//         </Button>
//         <Button 
//         disabled={record.isAdmin}
//         onClick={()=>handleDelete(record)} shape='circle' style={{marginRight:"10px"}}>
//           <DeleteTwoTone style={{ fontSize: '20px' }} twoToneColor="#F3969A"/>
//         </Button>
//          </>
//       ),
//     },
//   ];
//   return (
//   <>
//          <h2>用户列表</h2>
//            <Table pagination={{
//                     pageSize: 4
//                 }} columns={columns} dataSource={data} />
//   </>

//   )
// }


export default ProductListView
