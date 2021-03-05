import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    const {name, img, seller, price, stock, key} = props.product;
    return (
        <div className = 'products'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className = "product-name"><Link to={"/product/"+ key}>{name}</Link></h4>
                <p><small> by: {seller}</small></p>
                <br/>
                <p>${price}</p>
                <p>Only {stock} left in stock .Order soon</p>
                <br/>
                {props.showAddToCart && <button className= 'main-button' onClick = {() => props.handleAddProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart}/>Add to cart</button>}
            </div>
            
            
            
        </div>
    );
};

export default Product;