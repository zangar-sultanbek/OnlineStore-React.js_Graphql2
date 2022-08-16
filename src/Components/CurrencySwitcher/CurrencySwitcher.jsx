import React from 'react';
import { useState } from 'react';
import '../../SCSS/CurrencySwitcher/CurrencySwitcher.scss';
import dropIcon from '../../Assets/Icons/Navbar/Vector.svg';
import { useDispatch, connect } from 'react-redux';
import {TYPES} from '../../JS/Redux/Reducers';
import { useRef } from 'react';
import { useEffect } from 'react';

// const CurrencySwitcher = ({currencies, currency}) => {
//   const [isSelectOpen, setIsSelectOpen] = useState(false);
//   const dispatch = useDispatch();
//   const handleSelectOpen = () => setIsSelectOpen(state => !state);
//   const handleCurrencyChange = ({label, symbol}) => {
//     dispatch({type: TYPES.currency.setCurrency, payload: {label, symbol}});
//     setIsSelectOpen(false);
//   };
//   //Detect outside clicking
//   const ref = useRef(null);

//   useEffect(
//     () => {
//       if(isSelectOpen){
//         document.addEventListener("mousedown", handleClickOutside);
//       }else{
//         document.removeEventListener("mousedown", handleClickOutside);
//       }

//       function handleClickOutside(event) {
//         if(ref.current && !ref.current.contains(event.target)) {  
//             setIsSelectOpen(false);
//         }
//       }

//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, [ref, isSelectOpen]
//   );

  // return (
  //     <div className='currency_container' ref={ref}>
  //       <div className='currency_value'
  //       onClick={handleSelectOpen}>
  //         <span className='currency_value_text'>{currency.symbol}</span>
  //         <img className={`currency_value_img ${isSelectOpen ? `currency_value_img_selected` : ''}`} src={dropIcon} alt='open'/>
  //       </div>

  //       <div className={`${isSelectOpen ? 'currency_select' : 'currency_select_closed'}`}>
  //         {currencies.map(currencyItem => 
  //           <div 
  //           className={`${currency.label === currencyItem.label ? 'currency_option_selected' : 'currency_option'}`} 
  //           key={currencyItem.label}
  //           onClick={() => handleCurrencyChange(currencyItem)}>
  //             <p className='currency_option_text'
  //             >{currencyItem.symbol} {currencyItem.label}</p>
  //           </div>)}
  //       </div>
  //     </div>
  // )
// }

class CurrencySwitcher extends React.Component{
    constructor(props){
      super(props);
      this.ref = React.createRef();
      this.state = {
        isSelectOpen : false
      }
    }


  handleSelectOpen = () => this.setState(prevState => ({...prevState, isSelectOpen : !prevState.isSelectOpen}));

  handleClickOutside = (event) => {
    if(this.ref.current && !this.ref.current.contains(event.target)){  
        this.setState(prevState => ({...prevState, isSelectOpen : false}));
    }
  }

  handleCurrencyChange = ({label, symbol}) => {
      this.props.dispatch({type: TYPES.currency.setCurrency, payload: {label, symbol}});
      this.setState(prevState => ({...prevState, isSelectOpen : false}));
  }
    
    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.isSelectOpen !== prevState.isSelectOpen){
          if(this.isSelectOpen){
            document.addEventListener("mousedown", this.handleClickOutside);
          }else{
            document.removeEventListener("mousedown", this.handleClickOutside);
          }
        }
    }
    componentWillUnmount = () => {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }

    render(){
      return (
        <div className='currency_container' ref={this.ref}>
          <div className='currency_value'
          onClick={this.handleSelectOpen}>
            <span className='currency_value_text'>{this.props.currency.symbol}</span>
            <img className={`currency_value_img ${this.state.isSelectOpen ? `currency_value_img_selected` : ''}`} src={dropIcon} alt='open'/>
          </div>
  
          <div className={`${this.state.isSelectOpen ? 'currency_select' : 'currency_select_closed'}`}>
            {this.props.currencies.map(currencyItem => 
              <div 
              className={`${this.props.currency.label === currencyItem.label ? 'currency_option_selected' : 'currency_option'}`} 
              key={currencyItem.label}
              onClick={() => this.handleCurrencyChange(currencyItem)}>
                <p className='currency_option_text'
                >{currencyItem.symbol} {currencyItem.label}</p>
              </div>)}
          </div>
        </div>
    )
    }

}

export default React.memo(connect()(CurrencySwitcher));