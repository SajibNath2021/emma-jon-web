import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total , prd)=> total + prd.price * prd.quantity || 1, 0);
    //or
    // let total =0;
    // for(let i =  0; i < cart.length;i++){
    //     const prd = cart[i];
    //     total = total + prd.price; 
    // }
    let Shipping = 0;
    if(total > 35){
        Shipping = 0;
    } 
    else if (total > 15){
        Shipping = 4.99;
    }
    else if (total > 0){
        Shipping = 12.99
    }

    const tex = (total /10);

    const formatNumber = num =>{
        const number = num.toFixed(2);
        return Number(number);
    } 

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price : {formatNumber(total)}</p>
            <p>Shipping Cost : {Shipping}</p>
            <p>Tex + Vat :{formatNumber(tex)}</p>
            <p>Total Price : ${formatNumber(total + Shipping + tex)}</p>
            <br/>
           {
              props.children
           }
        </div>
    );
};

export default Cart;