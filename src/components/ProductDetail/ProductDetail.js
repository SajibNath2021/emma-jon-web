import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams()
    const [product, setProduct] = useState({});
     useEffect(()=>{
         fetch(`https://blooming-dusk-90996.herokuapp.com/singleProduct/`+productKey)
         .then(res => res.json())
         .then(data => setProduct(data))
     },[productKey])

    // const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h1>Your product details ({productKey})</h1>
            <Product showAddToCart = {false} product = {product}></Product>
        </div>
    );
};

export default ProductDetail;