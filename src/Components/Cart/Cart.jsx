import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../SCSS/Cart/Cart.scss';
import useTotalPrice from '../../JS/CustomHooks/useTotalPrice';
import { TYPES } from '../../JS/Redux/Reducers';
import { useState } from 'react';

import CartList from './CartList';
import CartCheer from './CartCheer';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const currency = useSelector(state => state.currency);
  const [cartItemsTotalSum, tax, quantity] = useTotalPrice(cart, currency);
  const [hasPurchased, setHasPurchased] = useState(false);
  const dispatch = useDispatch();

  const handlePurchase = () => {
    if(cart.length){
      dispatch({type: TYPES.cart.removeAll});
      setHasPurchased(true);
    }
  };

  return (
    <div className='cart_outlet'>
      <h3 className='header'>Cart</h3>
      
      {cart.length > 0
      ? 
        <>
          <div className="cart_items_list">
              <CartList isSliderDisplayed={true}/>
          </div>
          <div className='cart_summary_wrapper'>
            <div className="cart_summary">
              <p>Tax 21%: </p><strong>{currency.symbol + tax}</strong>
              <p>Quantity: </p><strong>{quantity}</strong>
              <p>Total: </p><strong>{currency.symbol + cartItemsTotalSum}</strong>
            <button onClick={handlePurchase}>Order</button>
            </div>
          </div>
        </>
      : 
        <>
          {/* {hasPurchased
          ? 
          <CartCheer />
          : <p className='empty_cart_text'>Oops, seems like your cart is empty.</p>} */}
          <CartCheer />
        </>}

  </div>
  )
}

export default Cart