import React from 'react';
import { Outlet } from 'react-router-dom';
import logoIcon from '../../Assets/Icons/Navbar/a-logo.svg';
import dropIcon from '../../Assets/Icons/Navbar/Vector.svg';
import cartIcon from '../../Assets/Icons/Navbar/Empty Cart.svg'
import '../../SCSS/Navbar/Navbar.scss';


const Navbar = () => {
  return (
    <>
        <header className='global_header'>
            <div className="navbar">
                <div className="navbar_navigation">
                    <p className='category_active'>women</p>
                    <p className='category'>men</p>
                    <p className='category'>kids</p>
                </div>

                <div className="navbar_logo">
                    <img src={logoIcon} alt='logo'/>
                </div>
                
                <div className="navbar_actions">
                    {/*In Figma's design you have 2 empty boxes inside the header's actions. I've added them too*/}
                    <div></div> 
                    <div></div>
                    <div className='currency_btn'>
                        <p className='currency_btn_text'>$</p>
                        <img className='currency_btn_img' src={dropIcon} alt='drop'/>
                    </div>
                    <div className='cart_btn'>
                        <img src={cartIcon} alt='cart'/>
                    </div>
                </div>


            </div>
        </header>
        <div className="outlet">
            <div className="outlet_content">
                <Outlet />
            </div>
        </div>
    </>
  )
}

export default Navbar