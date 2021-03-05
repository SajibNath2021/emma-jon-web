import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);

    const handleButton =()=> {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }

    let thankYou;
    if(orderPlace){
        thankYou = <img src={happyImage} alt=""/>
    }
    
    useEffect(() => {
        const saveData = getDatabaseCart();
        const productKey = Object.keys(saveData);
        const cartProducts = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);

            product.quantity = saveData[key];
            return product;
        });
        setCart(cartProducts);
    }, [])


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
                    <button onClick={handleButton} className="main-button">Place-Order</button> </Cart>
                </div>

        </div>
    );

};

export default Review;