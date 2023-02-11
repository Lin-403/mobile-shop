import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const navigate=useNavigate()

  const onSearch = (value) => {
    console.log(value,keyword)
    if (keyword.trim()) {
        navigate(`/search/${keyword}`)
      } else {
        navigate("/")
      }
  };

  return (
    <>
    <Search className='search'
      placeholder="input search text"
      allowClear
      enterButton="Search"
      onChange={(e)=>setKeyword(e.target.value)}
      size="large"
      style={{
        width: "30%",
        marginRight:"20px"
        // backgroundColor:"white"
      }}
      onSearch={onSearch}
    />
    {/* <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='搜索产品...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        搜索
      </Button>
    </Form> */}
    </>
  )
}

export default SearchBox
