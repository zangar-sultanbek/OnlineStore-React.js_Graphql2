import { useMemo } from 'react';
import {useSelector} from 'react-redux';
import {getCurrency} from '../Methods/Currency';

const useCurrency = (prices) => {
    const currency = useSelector(state => state.currency);
    const priceDetails = useMemo(
        () => getCurrency(currency, prices)
        , [currency, prices]
    );
    return priceDetails;
}

export default useCurrency;