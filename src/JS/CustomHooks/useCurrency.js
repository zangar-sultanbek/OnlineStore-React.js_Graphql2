import {useSelector} from 'react-redux';
import {getCurrency} from '../Methods/Currency';

const useCurrency = (prices) => {
    const currency = useSelector(state => state.currency);
    const priceDetails = getCurrency(currency, prices);
    return priceDetails;
}

export default useCurrency;