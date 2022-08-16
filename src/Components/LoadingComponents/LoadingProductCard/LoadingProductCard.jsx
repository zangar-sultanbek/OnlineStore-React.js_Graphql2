import React, { Component } from 'react';
import '../../../SCSS/LoadingProductCard/LoadingProductCard.scss';

class LoadingProductCard extends Component {
  render() {
    return (
      [...Array(3)].map((item, index) => 
      <div className='product_card_loading' key={index}>
            <div className='product_card_loading_img'/>
            <div className='product_card_loading_description'>
                <div className='description_name'/>
                <div className='description_price'/>
            </div>
        </div>)
    )
  }
}

export default LoadingProductCard