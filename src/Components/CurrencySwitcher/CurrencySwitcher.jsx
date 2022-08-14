import React from 'react';
import { useState } from 'react';
import '../../SCSS/CurrencySwitcher/CurrencySwitcher.scss';
import dropIcon from '../../Assets/Icons/Navbar/Vector.svg';
import { useDispatch } from 'react-redux';
import {TYPES} from '../../JS/Redux/Reducers';
import { useRef } from 'react';
import { useEffect } from 'react';

const CurrencySwitcher = ({currencies, currency}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const dispatch = useDispatch();
  const handleSelectOpen = () => setIsSelectOpen(state => !state);
  const handleCurrencyChange = ({label, symbol}) => {
    dispatch({type: TYPES.currency.setCurrency, payload: {label, symbol}});
    setIsSelectOpen(false);
  };
  //Detect outside clicking
  const ref = useRef(null);

  useEffect(
    () => {
      if(isSelectOpen){
        document.addEventListener("mousedown", handleClickOutside);
      }else{
        document.removeEventListener("mousedown", handleClickOutside);
      }

      function handleClickOutside(event) {
        if(ref.current && !ref.current.contains(event.target)) {  
            setIsSelectOpen(false);
        }
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, isSelectOpen]
  );

  return (
      <div className='currency_container' ref={ref}>
        <div className='currency_value'
        onClick={handleSelectOpen}>
          <span className='currency_value_text'>{currency.symbol}</span>
          <img className={`currency_value_img ${isSelectOpen ? `currency_value_img_selected` : ''}`} src={dropIcon} alt='open'/>
        </div>

        <div className={`${isSelectOpen ? 'currency_select' : 'currency_select_closed'}`}>
          {currencies.map(currencyItem => 
            <div 
            className={`${currency.label === currencyItem.label ? 'currency_option_selected' : 'currency_option'}`} 
            key={currencyItem.label}
            onClick={() => handleCurrencyChange(currencyItem)}>
              <p className='currency_option_text'
              >{currencyItem.symbol} {currencyItem.label}</p>
            </div>)}
        </div>
      </div>
  )
}

export default React.memo(CurrencySwitcher);