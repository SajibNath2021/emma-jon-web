import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
    const {name, img, seller, price, stock} = props.product;
    return (
        <div className = 'products'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className = "product-name">{name}</h4>
                <p><small> by: {seller}</small></p>
                <br/>
                <p>${price}</p>
                <p>Only {stock} left in stock .Order soon</p>
                <br/>
                <button className= 'main-button' onClick = {() => props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart}/>Add to cart</button>
            </div>
            
            
            
        </div>
    );
};

export default Product;