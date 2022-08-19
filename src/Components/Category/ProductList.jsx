import React from 'react'
import ProductCard from './ProductCard';
import LoadingProductCard from '../LoadingComponents/LoadingProductCard/LoadingProductCard'

const ProductList = ({products}) => {
    return (
        <div className='product_list'>
            {products 
            ?  products.map(product => <ProductCard key={product.id} product={product}/>)
            :  <LoadingProductCard />}
        </div>
    )
}

export default React.memo(ProductList);