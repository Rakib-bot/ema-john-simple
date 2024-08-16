import React, { useEffect, useState } from 'react';
import { getStoredCart, deleteFromDb ,clearTheCart} from '../../utilities/fakedb';
import { products } from '../../fakeData/products';
import './Review.css'
import ReviewItem from '../ReviewItem/ReviewItem';
import CartMenu from '../CartMenu/CartMenu';
import { Link, useNavigate} from 'react-router-dom'; // Import useHistory from react-router-dom
const Review = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const savedCart = getStoredCart();
        // console.log(savedCart)
        const productKeys = Object.keys(savedCart);
        //console.log(productKeys)
        const cartProducts = productKeys.map(key => {
            const product = products.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        //console.log(cartProducts)
        setCart(cartProducts);


    }, [])

    const handleProceedCheckOut = () => {
        navigate('/shipment');
    }

    const handleRemoveCartItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        deleteFromDb(productKey);
    }
    return (
        <div className='review__container'>
            <div className="review__product__container">
                {
                    cart.map(pd => <ReviewItem handleRemoveCartItem={handleRemoveCartItem} product={pd} key={pd.key}></ReviewItem>)
                }

            </div>
            <div className="order__summary__container">
                <CartMenu cart={cart}>
                
                        <button onClick={handleProceedCheckOut} className='btn-main'>Proceed Checkout</button>
                    
                </CartMenu>
            </div>

        </div>
    );
};

export default Review;