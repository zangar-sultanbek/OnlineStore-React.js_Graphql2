import React from 'react';

const Attribute = ({id, name, type, items, selectedAttributes, handleAttributeChange, isMutable = false}) => {
    const isSwatch = (type === 'swatch');
    const isSelectedAttribute = (item) => {
        const matchedAttribute = selectedAttributes.find(attribute => attribute.name === name);

        if(!matchedAttribute){
            return false;
        }

        return item.value === matchedAttribute.value;
    }

  return (
    <div className={`item_attribute`}>
        <p className='item_attribute_name'>{name}:</p>
        {items.length > 0
        &&
        <div className='item_attribute_items'>
            {items.map(item => 
                isSwatch //ternary for better readability instead of conditional attributes
                ? 
                <div 
                onClick={isMutable ? () => handleAttributeChange(name, item.value) : undefined}
                key={item.id}
                className={isSelectedAttribute(item) ? 'attribute_swatch_selected' : 'attribute_swatch'}
                style={{backgroundColor: item.value}}/>
                : 
                <div
                onClick={isMutable ? () => handleAttributeChange(name, item.value) : undefined}
                key={item.id}
                className={isSelectedAttribute(item) ? 'attribute_common_selected' : 'attribute_common'}>
                    <p className='attribute_common_value'>{item.value}</p>
                </div>
            )}
        </div>}
    </div>
  )
}

export default React.memo(Attribute)