import React from 'react';
import '../../SCSS/CartOverlay/CartOverlay.scss';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import routes from '../../JS/Router/routes';
import { TYPES } from '../../JS/Redux/Reducers';
import CartList from '../Cart/CartList';

const CartOverlay = ({cart, currency, handleOverlay, cartItemsTotalSum, totalQuantity}) => {
  const dispatch = useDispatch();
  const handlePurchase = () => cart.length && dispatch({type: TYPES.cart.removeAll});
  
  return (
    <>
      <div className='cart_overlay' />
      <div className='cart_content'>
        <h3 className='cart_content_header'>
            <strong>My Bag</strong>, {totalQuantity} items
        </h3>
        {cart.length > 0 
        && 
        <>
          <div className='cart_content_details'>
            <CartList />
          </div>
          <div className='cart_content_sum'>
              <strong>Total</strong>
              <strong>{currency.symbol}{cartItemsTotalSum}</strong>
          </div>
        </>
        }
        <div className='cart_content_actions'>
           <Link to={routes.cart} onClick={handleOverlay}>
              <div className='open-cart_btn'>
                    View Bag
              </div>
           </Link>
            <div className='purchase_btn'
            onClick={handlePurchase}>
                Check Out
            </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(CartOverlay);