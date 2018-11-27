import React from 'react';
import {connect} from 'react-redux';

import * as selectors from '../selectors';

let ShoppingCartIcon = ({totalQuantity}) => (
    <div>
        <span className="fas fa-shopping-cart"></span>&nbsp;
        ({totalQuantity})
    </div>
);

const mapStateToProps = (state) => ({
    totalQuantity: selectors.getShoppingCart(state).totalQuantity
});

ShoppingCartIcon = connect(mapStateToProps)(ShoppingCartIcon);

export default ShoppingCartIcon;