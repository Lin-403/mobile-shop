import React from 'react'
import { useEffect } from 'react';
import propTypes from "prop-types"

const Rating = ({value,text,color}) => {
    var arr=[1,2,3,4,5];
  return (
    <div  className='rating'>
        {
        arr.map(i=>{
            // console.log(i,value)
            return <span>
            <i style={{color}} className={
                value>=i?"fas fa-star":value>=i-0.5?"fas fa-star-half-alt":"far fa-star"
            }></i>
        </span>
        })
        }
         <span> {text && text }</span>
    </div>
  )
}
Rating.defaultProps={
    color:"#f8e825"
}
Rating.propTypes={
    value:propTypes.number.isRequired,
    text:propTypes.string.isRequired,
    color:propTypes.string,

}

export default Rating