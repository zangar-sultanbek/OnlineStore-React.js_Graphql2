import { getCurrency } from "../Methods/Currency";
import { useMemo } from "react";

const taxPercent = 0.21;

const useTotalPrice = (cart, currency) => {
    const cartItemsTotalSum = useMemo(
        () => {
            let quantity = 0;
            const total = cart.reduce((current, next) => {
                quantity += next.productCount;
                return current + (getCurrency(currency, next.prices).amount * next.productCount);
            }, 0);
            const tax = total * taxPercent;
            const totalWithTax = total + tax;
            return [totalWithTax.toFixed(2), tax.toFixed(2), quantity];
        }, [cart, currency]); 
    
    return cartItemsTotalSum;
}

export default useTotalPrice;