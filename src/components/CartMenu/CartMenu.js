import React from 'react';

import './CartMenu.css'
import { Link } from 'react-router-dom';
const CartMenu = (props) => {
    const cart=props.cart;
    const totalPrice = cart.reduce((total,cart)=>total+cart.price*(cart.quantity?cart.quantity:1),0);

    return (
        <div>
            <h1>Order Summary</h1>
            <h3>Item Selected : {cart.length}</h3>
             <h2>total price : {totalPrice}</h2>
            {
                props.children
            }

            
        </div>
    );
};

export default CartMenu;