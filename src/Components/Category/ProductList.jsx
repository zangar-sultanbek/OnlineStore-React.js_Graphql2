import React from 'react'
import ProductCard from './ProductCard';

class ProductList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='product_list'>
                {this.props.products.map(product => <ProductCard key={product.id} product={product}/>)}
            </div>
        );
    }
}

export default React.memo(ProductList);