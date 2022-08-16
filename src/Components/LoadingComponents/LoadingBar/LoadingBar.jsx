import React, { Component } from 'react';
import '../../../SCSS/LoadingBar/LoadingBar.scss';

class LoadingBar extends Component {
  render() {
    return (
      <div className="loading_bar_wrapper">
        <div className='loading_bar' />
      </div>
    )
  }
}

export default LoadingBar