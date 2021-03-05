import React from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity, key, price}=props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
    }
    return (
        <div style={reviewItemStyle}>
            <h1 className="product-name">Product Name : {name}</h1>
            <h3>Quantity : {quantity}</h3>  
            <p><small>Price: {price}</small></p>
            <button onClick={()=>props.removeItem(key)} className="main-button">Remove Item</button>          
        </div>
    );
};

export default ReviewItem;