import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ShoppingItemList from './ShoppingItemList';
import * as selectors from '../selectors';
import * as actions from '../actions';

const ShoppingCart = ({cart, history, onUpdateQuantity, onRemoveItem}) => (

    <div>
        <ShoppingItemList list={cart} edit
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}/>
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

const mapDispatchToProps = {
    onUpdateQuantity: actions.updateShoppingCartItemQuantity,
    onRemoveItem: actions.removeShoppingCartItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);