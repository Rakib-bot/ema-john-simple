import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';


const Product = (props) => {
    //console.log(props);
    const {img,name,price,seller,stock,key} = props.product;
    return (
        <div className="product">
            <div className="pd-img">
                <img src={img} alt="" />

            </div>
            <div className="pd-info">
                <h4><Link to={"/product/"+key}>{name}</Link></h4>{/* handle dynamic route using only link */ }
                <br />
                <p><small>By:{seller}</small></p>
                <p><b>${price}</b></p>
            
                <p><small>Only <b>{stock} </b> left in Stock</small></p>
                {
                    props.btn &&  <button onClick={()=>props.handleCart(props.product)} className="btn-main"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
                }
             

            </div>
        </div>
    );
};

export default Product;