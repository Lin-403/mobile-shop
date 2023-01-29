import React from 'react';
import { Alert, Space, Spin } from 'antd';

const Loader=()=>{
    return (
        
         <Space
         direction="vertical"
         style={{
            width:"100px",
            height:"100px",
            margin:"auto",
            display:"block",
            padding:"0 1rem"
         }}
       >
         <Space>
           <Spin tip="Loading" size="large">
           </Spin>
         </Space>
     
        
       </Space>
    )
}

export default Loader