import React, {useState} from 'react';
import {useDispatch, useSelector, connect} from 'react-redux';
import cartBtnIcon from '../../Assets/Icons/Category/Circle_Icon.svg';
import useCurrency from '../../JS/CustomHooks/useCurrency';
import {TYPES} from '../../JS/Redux/Reducers';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrency } from '../../JS/Methods/Currency';

// const ProductCard = ({product}) => {
//   const {inStock, id, name, gallery, prices, attributes} = product;
//   const price = useCurrency(prices);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const hasAttributes = () => attributes.length > 0;
//   const addCartItem = (e) => {
//     e.stopPropagation();

//     dispatch({
//       type: TYPES.cart.addItem,
//       payload: {...product, price, productCount : 1, selectedAttributes: []}
//     });
//   }
//   const redirectToProduct = () => navigate(`/${id}`);

//   return (
//       <div 
//       className={`product_card ${inStock ? 'product_card_hoverable' : 'product_card_disabled'}`}
//       onClick={redirectToProduct}>
//           <div className='product_card_img'>
//             <img src={gallery[0]} alt={name}/>
//             {!inStock && <span className='img_stock'>out of stock</span>}
//             {inStock 
//             &&  
//             <button className={hasAttributes() ? 'product_cart_btn_disabled': 'product_card_btn'} 
//             onClick={hasAttributes() ? undefined : addCartItem}>
//               <img src={cartBtnIcon} alt='cart'/></button>}
//             </div>
//           <div className='product_card_description'>
//             <span className='description_name'>{name}</span>
//             <h4 className='description_price'>{price.priceCurrency.symbol}{price.amount}</h4>
//           </div>
//       </div>
//   )
// }
const mapStateToProps = state => {
  return ({
    currency: state.currency
  });
}

class ProductCard extends React.Component{
    constructor(props){
      super(props);
    }

    hasAttributes = () => this.props.product.attributes.length > 0;
    addCartItem = (e, price) => {
        e.preventDefault();
        this.props.dispatch({
          type: TYPES.cart.addItem, 
          payload: {...this.props.product, price: price, productCount : 1, selectedAttributes: []}});
    }

    render(){
      const price = getCurrency(this.props.currency, this.props.product.prices);
      const {id,inStock, name, gallery} = this.props.product;
      return (
          <Link 
          to={`/${id}`}
          className={`product_card ${inStock ? 'product_card_hoverable' : 'product_card_disabled'}`
          }>
            <div className='product_card_img'>
              <img src={gallery[0]} alt={name}/>
              {!inStock && <span className='img_stock'>out of stock</span>}
              {inStock 
              &&  
              <button 
              className={this.hasAttributes() ? 'product_cart_btn_disabled': 'product_card_btn'} 
              onClick={(e) => this.hasAttributes() ? undefined : this.addCartItem(e, price)}
              >
                <img src={cartBtnIcon} alt='cart'/></button>}
              </div>
            <div className='product_card_description'>
              <span className='description_name'>{name}</span>
              <h4 className='description_price'>{price.priceCurrency.symbol}{price.amount}</h4>
            </div>
          </Link>
          )
    }
}

export default React.memo(connect(mapStateToProps)(ProductCard));