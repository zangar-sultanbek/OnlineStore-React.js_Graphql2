import React from 'react';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { getCurrency } from '../../JS/Methods/Currency';

const CartList = ({isSliderDisplayed = false}) => {
    const cart = useSelector(state => state.cart);
    const currency = useSelector(state => state.currency);

    return (
        cart.map(cartItem => 
            <CartItem 
            key={cartItem.uniqueId} 
            {...cartItem} 
            price={getCurrency(currency, cartItem.prices)} 
            isSliderDisplayed={isSliderDisplayed}/>)
    )
}

export default React.memo(CartList);