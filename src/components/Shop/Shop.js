import React, { useEffect, useState } from 'react';
import { products } from '../../fakeData/products';
import './Shop.css';
import Product from '../Product/Product';
import CartMenu from '../CartMenu/CartMenu';
import { addToDb, clearTheCart, getStoredCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {

    // console.log(products[0])
    // clearTheCart();
    const [cart, setCart] = useState([]);

    useEffect(()=>{

        const savedCart = getStoredCart();
        // console.log(savedCart)
         const productKeys = Object.keys(savedCart);
         //console.log(productKeys)
        const cartProducts = productKeys.map(key =>{
               const product = products.find(pd => pd.key === key);
               product.quantity = savedCart[key];
               return product;
        })
        //console.log(cartProducts)
        setCart(cartProducts);

    },[])

    const handleCart = (product) => {

        const sameProduct = cart.find(pd => pd.key === product.key)
        debugger;
        if (sameProduct) {
            product.quantity += 1;
            const others = cart.filter(pd => pd.key !== product.key);
            debugger
            const newCart = [...others, product];
            setCart(newCart);
        }
        else {
            product.quantity = 1;
            debugger
            const newCart = [...cart, product];
            setCart(newCart);
        }

        addToDb(product.key);

    };


    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.slice(0, 10).map(pdt => {

                        return <Product btn={true} handleCart={handleCart} product={pdt} key={pdt.key}></Product>
                    }
                    )
                }

            </div>
            <div className="cart-container">

                <CartMenu cart={cart}>
                    <Link to="/review">
                        <button className='btn-main' >Review Order</button>
                    </Link>
                </CartMenu>

            </div>

        </div>
    );
};

export default Shop;
