import React from 'react';
import './Product.css';


const Product = (props) => {
    //console.log(props);
    const {img,name,price,seller,stock} = props.product;
    return (
        <div className="product">
            <div className="pd-img">
                <img src={img} alt="" />

            </div>
            <div className="pd-info">
                <h4>{name}</h4>
                <br />
                <p><small>By:{seller}</small></p>
                <p><b>${price}</b></p>
            
                <p><small>Only <b>{stock} </b> left in Stock</small></p>
              <button onClick={()=>props.handleCart(props.product)} className="btn-main"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>

            </div>
        </div>
    );
};

export default Product;