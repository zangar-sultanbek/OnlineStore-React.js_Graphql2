import { getLocalStorage } from "./LocalStorage";
import {v4} from 'uuid';
import attributesToStr from "../Methods/Attributes";
import makeDeepCopy from "../Methods/Copy";

const initialStoreState = 
getLocalStorage()
?? 
{
    cart: [], 
    currency: {label: 'USD', symbol: '$'}, 
    selectedCategory: ''
}

const reducer = (state = initialStoreState, action) => {
    switch(action.type){
        case 'category/setCategory':
            return {...state, selectedCategory: action.payload};
        case 'currency/setCurrency':
            return {...state, currency: ({...state.currency, label: action.payload.label, symbol: action.payload.symbol})};
        case 'cart/addItem':
            {
                const matchedItemIndex = state.cart.findIndex(item => attributesToStr(item) === attributesToStr(action.payload));

                if(matchedItemIndex > -1){
                    console.log(`already exists. increased count`);
                    const cartCopy = makeDeepCopy(state.cart);
                    cartCopy[matchedItemIndex].productCount += 1;
                    return {...state, cart: cartCopy};
                }

                const itemDeepCopy = makeDeepCopy(action.payload);
                return {...state, cart: [{...itemDeepCopy, uniqueId: v4()}, ...state.cart]}
            }
        case 'cart/increaseCount':
            {
                const matchedItemIndex = state.cart.findIndex(item => item.uniqueId === action.payload.uniqueId);

                if(matchedItemIndex <= -1){
                    console.log(`No such item with id: ${action.payload.uniqueId} found in cart`);
                    return state;
                }

                const cartCopy = makeDeepCopy(state.cart);
                cartCopy[matchedItemIndex].productCount += action.payload.increaseBy;

                return {...state, cart: cartCopy};
            }
        case 'cart/removeItem':
            return {...state, cart: state.cart.filter(item => item.uniqueId !== action.payload?.uniqueId)}
        case 'cart/removeAll':
            return {...state, cart: []}
        default:
            return state;
    }
}

const TYPES = {
    category : {
        setCategory : 'category/setCategory'
    },
    cart:{
        addItem: 'cart/addItem',
        removeItem: 'cart/removeItem',
        removeAll: 'cart/removeAll',
        increaseCount: 'cart/increaseCount'
    },
    currency: {
        setCurrency: 'currency/setCurrency'
    }
};
Object.freeze(TYPES);

export{
    initialStoreState, reducer, TYPES
}