import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct } from '../../JS/GraphQL/Queries';
import '../../SCSS/PDP/Product.scss';
import Attribute from '../Cart/Attribute';
import useCurrency from '../../JS/CustomHooks/useCurrency';
import routes from '../../JS/Router/routes';
import { useCallback } from 'react';
import {TYPES} from '../../JS/Redux/Reducers';
import LoadingBar from '../LoadingComponents/LoadingBar/LoadingBar';


const Product = () => {
    const {id} = useParams();
    const [selectedAttributes, setSelectedAttributes] = useState(null);
    const {loading, error, data} = useQuery(getProduct(id), {onCompleted});
    const price = useCurrency(data?.product?.prices);
    const [displayedImageIndex, setDisplayedImageIndex] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleImage = index => (index !== displayedImageIndex) && setDisplayedImageIndex(index);
    const handleCartBtn = () => dispatch({type: TYPES.cart.addItem, payload: {...data.product, selectedAttributes, price, productCount : 1}});
    const handleAttributeChange = useCallback(
            (attributeName, attributeValue) => {
            //check for value inequality to prevent re-renders on click
            const matchedAttributeIndex = selectedAttributes.findIndex(attribute => 
                attribute.name === attributeName && attribute.value !== attributeValue);

            if(matchedAttributeIndex <= -1){
                return;
            }

            setSelectedAttributes(state => {
                const stateCopy = [...state];
                stateCopy[matchedAttributeIndex].value = attributeValue;
                return stateCopy;
            });
        }, [selectedAttributes]
    );
    function onCompleted(data){
        if(!data.product){
            return navigate(routes.home);
        }
        setSelectedAttributes(data.product.attributes.map(item => ({name : item.name, value : item.items[0].value})));
    }

    if(!data){
        return <LoadingBar />
    }

    return (
        <>
            <div className="product_images">
                {data.product.gallery.map((galleryImg, index) => 
                <img 
                key={galleryImg}
                className='product_img' 
                src={galleryImg} 
                alt={`img_${index+1}`}
                onClick={() => handleImage(index)}/>)}
            </div>
            <div className="product_content">
                <div className="product_content_img">
                    <img src={data.product.gallery[displayedImageIndex]} alt={`${data.product.name}_img`} />
                </div>
                <div className="product_content_description">
                    <header className='product_name'>
                        <h3 className='product_name_brand'>{data.product.brand}</h3>
                        <h3 className='product_name_name'>{data.product.name}</h3>
                    </header>
                    {data.product.attributes.length > 0 
                    &&
                    <div className='item_attributes'>
                        {data.product.attributes.map(attribute => 
                            <Attribute 
                            key={attribute.id}
                            {...attribute}
                            selectedAttributes={selectedAttributes}
                            handleAttributeChange={handleAttributeChange}
                            isMutable={true}
                            />
                        )}
                    </div>
                    }
                    <div className="product_price">
                        <p className='product_price_label'>Price: </p>
                        <p className='product_price_value'><strong>{price.priceCurrency.symbol}{price.amount}</strong></p>
                    </div>
                    <div 
                    className={data.product.inStock ? "product_cart_btn" : 'product_cart_btn_disabled'}
                    onClick={data.product.inStock ? handleCartBtn : undefined}>
                        {data.product.inStock ? 'Add To Cart' : 'Out Of Stock'}
                    </div>
                    <div className="product_description" dangerouslySetInnerHTML={{__html: data.product.description}}/>
                </div>
            </div>
        </>
    )
}

export default React.memo(Product);