import React from 'react';
import {connect} from 'react-redux';

import ShoppingItemList from './ShoppingItemList';
import BuyForm from './BuyForm';
import * as selectors from '../selectors';

const Buy = ({cart}) => cart.items.length > 0 && (
    <div>
        <BuyForm/>
        <ShoppingItemList list={cart}/>
    </div>
);

const mapStateToProps = state => ({
    cart: selectors.getShoppingCart(state)
});

export default connect(mapStateToProps)(Buy);