import React from 'react';
import {Link} from 'react-router-dom';
import routes from '../../JS/Router/routes';

class CartCheer extends React.Component{
  render(){
    return (
      <div className='cheer_container'>
          <div className="cheer_anim">

          </div>
          <h3 className='cheer_message'><p>Thank you</p> for purchase :) Check out our other <Link to={routes.home}>products</Link></h3>
          <div className="cheer_img_container">
              <img 
              className='cheer_img'
              src='https://wpblog.zyro.com/cdn-cgi/image/w=700,q=85/wp-content/uploads/2022/01/hand-written-thank-you-note-on-table.jpg' 
              alt='thanks'/>
              {/* <p className='cheer_hint'>Well, I just looked up some random image on Google for "thank you" and here it is, the letter! :D</p> */}
          </div>
      </div>
    )
  }
}

export default CartCheer