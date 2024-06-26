import React, { useState } from 'react';
import { products } from '../../fakeData/products';
import './Shop.css';
import Product from '../Product/Product';
import CartMenu from '../CartMenu/CartMenu';

const Shop = () => {

    // console.log(products[0])
    const [cart, setCart] = useState([]);
    const handleCart = (product) => {

        const newCart = [...cart, product];
        setCart(newCart);


    };


    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.slice(0, 10).map(pdt => {

                        return <Product handleCart={handleCart} product={pdt} key={pdt.key}></Product>
                    }
                    )
                }

            </div>
            <div className="cart-container">
                  
                <CartMenu cart={cart}></CartMenu>

            </div>

        </div>
    );
};

export default Shop;
