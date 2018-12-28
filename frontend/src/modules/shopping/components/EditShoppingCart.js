import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';
import {withRouter} from 'react-router-dom';

import {ShoppingCart} from '..';
import * as selectors from '../selectors';

const EditShoppingCart = ({cart, history}) => (
    <div>
        <ShoppingCart cart={cart} edit/>
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

export default withRouter(connect(mapStateToProps)(injectIntl(EditShoppingCart)));