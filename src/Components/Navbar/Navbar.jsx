import React, { useState }  from 'react';
import {createPortal} from 'react-dom';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, connect } from 'react-redux';
import logoIcon from '../../Assets/Icons/Navbar/a-logo.svg';
import cartIcon from '../../Assets/Icons/Navbar/Empty Cart.svg'
import '../../SCSS/Navbar/Navbar.scss';
import CartOverlay from '../CartOverlay/CartOverlay';
import CurrencySwitcher from '../CurrencySwitcher/CurrencySwitcher';
import { useQuery } from '@apollo/client';
import { getCategoriesAndCurrencies } from '../../JS/GraphQL/Queries';
import { TYPES } from '../../JS/Redux/Reducers';
import routes from '../../JS/Router/routes';
import useTotalPrice from '../../JS/CustomHooks/useTotalPrice';
import client from '../../Client';

const mapStateToProps = state => ({
    cart: state.cart,
    currency: state.currency,
    selectedCategory : state.selectedCategory
});

class Navbar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isOverlayOpen : false,
            selectedCategory : this.props.selectedCategory ?? null,
            data : null,
            error : null
        }
    }
    componentDidMount(){
        client.query({query: getCategoriesAndCurrencies()})
        .then(result => {
            if(!this.props.selectedCategory){
                this.props.dispatch({type: TYPES.category.setCategory, payload: result.data.categories[0].name});
            }
            
            if(!this.props.currency.label){
                this.props.dispatch({type: TYPES.currency.setCurrency, payload: result.data.currencies[0]});
            }
            this.setState(prevState => 
                ({
                    ...this.state, 
                    selectedCategory : prevState.selectedCategory ?? result.data.categories[0].name,
                    data: result.data,
                }));
        })
        .catch(error => this.setState(prevState => ({...prevState, error})));
    }

    handleOverlay = () =>
        this.setState(({...this.state, isOverlayOpen : !this.state.isOverlayOpen}))
    
    handleCategorySwitch(newCategoryName){
        if(this.state.selectedCategory !== newCategoryName){
            this.setState(({...this.state, selectedCategory : newCategoryName}));
            this.props.dispatch({type: TYPES.category.setCategory, payload: newCategoryName});
        }
        
        // if(window.location.pathname !== routes.home){
        //     return <Navigate to={routes.home}/>
        // }
    }

    render(){
        if(this.state.error){
            return <h1 className='fetch_error_message'>{
                this.state.error.message}
                (Please make sure the GraphQL server is <strong>running</strong> on port <strong>4000</strong>)</h1>
        }

        const totalPrice = useTotalPrice(this.props.cart, this.props.currency);
        return (
        <>
            <header className='global_header'>
                <div className="navbar">
                    <div className="navbar_navigation">
                        {this.state.data?.categories.map(category => 
                            window.location.pathname === routes.home
                            ?
                            <p 
                            key={category.name} 
                            onClick={() => this.handleCategorySwitch(category.name)}
                            className={category.name === this.state.selectedCategory ? 'category_active' : 'category'}>
                                {category.name}
                            </p>
                            :
                            <Link
                            to={routes.home}
                            key={category.name} 
                            onClick={() => this.handleCategorySwitch(category.name)}
                            className={category.name === this.state.selectedCategory ? 'category_active' : 'category'}>
                                {category.name}
                            </Link>)
                        }
                    </div>
    
                    <div className="navbar_logo">
                        <img src={logoIcon} alt='logo'/>
                    </div>
                    
                    <div className="navbar_actions">
                        {/*In Figma's design you have 2 empty boxes inside the header's actions. I've added them too*/}
                        <div></div> 
                        <div></div>
                        <div className='currency_btn'>
                            <CurrencySwitcher currencies={this.state.data?.currencies ?? []} currency={this.props.currency}/>
                        </div>
                        <div className='cart_btn'
                        onClick={this.handleOverlay}>
                            <img src={cartIcon} alt='cart'/>
                            {Boolean(this.props.cart.length) && <span className='cart_btn_value'>{totalPrice[2]}</span>}
                        </div>
                        {this.state.isOverlayOpen 
                        && 
                        createPortal(
                        <CartOverlay 
                        cart={this.props.cart} 
                        currency={this.props.currency} 
                        handleOverlay={this.handleOverlay}
                        cartItemsTotalSum={totalPrice[0]} 
                        totalQuantity={totalPrice[2]}
                        />
                        , document.getElementById('root'))}
                    </div>
                </div>
            </header>
            
            <div className="outlet" id='outlet'>
                <div className="outlet_content">
                    <Outlet />
                </div>
            </div>
        </>
        );
    }
}

export default React.memo(connect(mapStateToProps)(Navbar));


// const Navbar = () => {
//     const {loading, error, data} = useQuery(getCategoriesAndCurrencies(), {onCompleted});
//     const cart = useSelector(state => state.cart);
//     const currency = useSelector(state => state.currency);
//     const storeSelectedCategory = useSelector(state => state.selectedCategory);
//     const [isOverlayOpen, setIsOverlayOpen] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(storeSelectedCategory || '');
//     const [cartItemsTotalSum, , totalQuantity] = useTotalPrice(cart, currency);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
    
//     const handleOverlay = () => setIsOverlayOpen(state => !state);
//     const handleCategorySwitch = (newCategoryName) => {
//         if(selectedCategory !== newCategoryName){
//             setSelectedCategory(newCategoryName);
//             dispatch({type: TYPES.category.setCategory, payload: newCategoryName});
//         }

//         if(window.location.pathname !== routes.home){
//             navigate(routes.home);
//         }
//     }

//     function onCompleted(data){
//         const categoryName = data.categories[0].name;
        
//         if(!storeSelectedCategory){
//             dispatch({type: TYPES.category.setCategory, payload: categoryName});
//             setSelectedCategory(categoryName);
//         }
//         if(!currency.label){
//             const {label, symbol} = data.currencies[0];
//             dispatch({type: TYPES.currency.setCurrency, payload: {label, symbol}});
//         }
//     }

//   return (
    // <>
    //     <header className='global_header'>
    //         <div className="navbar">
    //             <div className="navbar_navigation">
    //                 {data?.categories.map(category => 
    //                     <p 
    //                     key={category.name} 
    //                     onClick={() => handleCategorySwitch(category.name)}
    //                     className={category.name === selectedCategory ? 'category_active' : 'category'}>
    //                         {category.name}
    //                     </p>)
    //                 }
    //             </div>

    //             <div className="navbar_logo">
    //                 <img src={logoIcon} alt='logo'/>
    //             </div>
                
    //             <div className="navbar_actions">
    //                 {/*In Figma's design you have 2 empty boxes inside the header's actions. I've added them too*/}
    //                 <div></div> 
    //                 <div></div>
    //                 <div className='currency_btn'>
    //                     <CurrencySwitcher currencies={data?.currencies ?? []} currency={currency}/>
    //                 </div>
    //                 <div className='cart_btn'
    //                 onClick={handleOverlay}>
    //                     <img src={cartIcon} alt='cart'/>
    //                     {Boolean(cart.length) && <span className='cart_btn_value'>{totalQuantity}</span>}
    //                 </div>
    //                 {isOverlayOpen 
    //                 && 
    //                 createPortal(
    //                 <CartOverlay 
    //                     cart={cart} 
    //                     currency={currency} 
    //                     handleOverlay={handleOverlay}
    //                     cartItemsTotalSum={cartItemsTotalSum} 
    //                     totalQuantity={totalQuantity}/>
    //                 , document.getElementById('root'))}
    //             </div>
    //         </div>
    //     </header>
        
    //     <div className="outlet" id='outlet'>
    //         <div className="outlet_content">
    //             <Outlet />
    //         </div>
    //     </div>
    // </>
//   )
// }

