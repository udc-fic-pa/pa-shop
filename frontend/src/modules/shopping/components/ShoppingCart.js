import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ShoppingItemList from './ShoppingItemList';
import * as selectors from '../selectors';

const ShoppingCart = ({cart, history}) => (
    <div>
        <ShoppingItemList list={cart} edit/>
        {cart.items.length > 0 &&
        <div className="text-center">
            <button type="button" className="btn btn-primary"
                onClick={() => history.push('/shopping/buy')}>
                <FormattedMessage id="project.global.buttons.buy"/>
            </button>
        </div>
        }
    </div>
);

const mapStateToProps = state => ({
    cart: selectors.getShoppingCart(state)
});

export default connect(mapStateToProps)(ShoppingCart);