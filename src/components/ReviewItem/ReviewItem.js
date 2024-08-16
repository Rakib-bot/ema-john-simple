import React from 'react';
import { Link } from 'react-router-dom';
import './ReviewItem.css'
const ReviewItem = (props) => {
    //console.log(props.product.key)
   const {key,name,price,quantity,img} = props.product;
   
    return (
        <div className="ReviewItem">
            <Link style={{textDecoration:'none'}} to= { `/product/${props.product.key}`} > <p >{name}</p> </Link>
            <p>Price : {price}</p>
            <p>Quantity : {quantity}</p>
            <button className='btn-main' onClick={()=>props.handleRemoveCartItem(key) }>Remove</button>


        </div>
    );
};

export default ReviewItem;