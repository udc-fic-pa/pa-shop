import React from 'react';
import {useSelector} from 'react-redux';

import ShoppingItemList from './ShoppingItemList';
import BuyForm from './BuyForm';
import * as selectors from '../selectors';

const Buy = ({history}) => {

    const cart = useSelector(selectors.getShoppingCart);

    if (cart.items.length === 0) {
        return null;
    }
    
   return (
        <div>
            <BuyForm history={history}/>
            <ShoppingItemList list={cart}/>
        </div>
    );

}

export default Buy;