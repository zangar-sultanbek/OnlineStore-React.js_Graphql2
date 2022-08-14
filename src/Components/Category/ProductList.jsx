import React from 'react'
import ProductCard from './ProductCard';

const ProductList = ({products}) => {
    return (
        <div className='product_list'>
            {products.map(product => <ProductCard key={product.id} product={product}/>)}
        </div>
    )
}

export default React.memo(ProductList);