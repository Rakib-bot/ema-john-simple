import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../fakeData/products';
import Product from '../Product/Product';
const ProductReview = () => {
    const {productKey} = useParams();
    const product  = products.find(it => it.key === productKey);

    return (
       <Product btn={false} product={product}></Product>
    );
};

export default ProductReview;