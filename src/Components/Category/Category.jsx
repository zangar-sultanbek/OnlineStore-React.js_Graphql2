import {memo, useState, useEffect, useMemo} from 'react';
import '../../SCSS/Category/Category.scss';
import ProductList from './ProductList';
//GraphQL
import { useQuery } from '@apollo/client';
import {getAllDataQuery} from '../../JS/GraphQL/Queries';
//Redux
import {useSelector} from 'react-redux';

const Category = () => {
  const {loading, error, data} = useQuery(getAllDataQuery());
  const selectedCategory = useSelector(state => state.selectedCategory);

  const productCategory = useMemo(
    () => {
      if(!selectedCategory || !data?.categories){
        return null;
      }
      return data.categories.find(category => category.name === selectedCategory);
    }, [selectedCategory, data?.categories] 
  );

  if(error){
    return <span>
      <p style={{color: 'red', display: 'inline-block'}}>Unpredicted Error:</p> 
      {error.message}. Are you sure GraphQL <strong>server</strong> is on & running on port <strong>4000</strong>?</span>
  }
  
  return (
    <div className='category_outlet'>
        <h3 className='header'>{productCategory?.name ?? 'Loading...'}</h3>
        <ProductList products={productCategory?.products}/>
    </div>
  )
}

export default memo(Category);