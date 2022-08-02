import React from 'react';
import '../../SCSS/Category/Category.scss';
import ProductList from './ProductList';

const Category = () => {
  return (
    <div className='category_outlet'>
        <h3 className='header'>Category name</h3>
        <ProductList />
    </div>
  )
}

export default Category