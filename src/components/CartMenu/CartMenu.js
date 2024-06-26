import React from 'react';


const CartMenu = (props) => {
    const cart=props.cart;
    const totalPrice = cart.reduce((total,cart)=>total+cart.price,0);
    return (
        <div>
            <h1>Order Summary</h1>
            <h3>Item Selected : {cart.length}</h3>
             <h2>total price : {totalPrice}</h2>

            
        </div>
    );
};

export default CartMenu;