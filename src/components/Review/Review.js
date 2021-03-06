import React, { useEffect, useState } from 'react';

import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    const history = useHistory();
    const handleProceedCheckout =()=> {
     history.push('/shipment')
    }

    let thankYou;
    if(orderPlace){
        thankYou = <img src={happyImage} alt=""/>
    }
    
    useEffect(() => {
        const saveData = getDatabaseCart();
        const productKey = Object.keys(saveData);
        
        fetch('https://blooming-dusk-90996.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productKey)
        })
        .then(res => res.json())
        .then(data => setCart(data))
       }, []) 
        // const cartProducts = productKey.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);

        //     product.quantity = saveData[key];
        //     return product;
        // });
        // setCart(cartProducts);



    const removeItem = (productKey) => {
        const newProduct = cart.filter(pd => pd.key !== productKey);
        setCart(newProduct);
        removeFromDatabaseCart(productKey);
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem
                        removeItem={removeItem}
                        key={pd.key}
                        product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                    <Cart cart = {cart}> 
                    <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button> </Cart>
                </div>

        </div>
    );

};

export default Review;