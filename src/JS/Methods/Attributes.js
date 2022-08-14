const attributesToStr = (product) => product.selectedAttributes.map(attribute => Object.values(attribute)).join('');
export default attributesToStr;