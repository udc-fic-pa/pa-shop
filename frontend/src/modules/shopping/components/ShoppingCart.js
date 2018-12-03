import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from 'react-intl';

import * as selectors from '../selectors';
import ShoppingCartItem from './ShoppingCartItem';

let ShoppingCart = ({cart}) => {

    if (cart.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.shopping.ShoppingCart.empty'/>
            </div>
        );
    }

    return (

        <div>

            <table className="table">

                <thead>
                    <tr>
                        <th scope="col" className="col-md-4"></th>
                        <th scope="col" className="col-md-2">
                            <FormattedMessage id='project.global.fields.price'/>
                        </th>
                        <th scope="col" className="col-md-2">
                            <FormattedMessage id='project.global.fields.quantity'/>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {cart.items.map((item, index) => 
                        <ShoppingCartItem key={index} item={item} index={index}/>
                    )}
                </tbody>

            </table>

            <p className="text-center font-weight-bold">
                <FormattedMessage id='project.global.fields.totalPrice'/>: {cart.totalPrice}€
            </p>

            <div className="text-center">
                <button type="button" className="btn btn-primary"
                    onClick={() => alert('Not implemented :-(')}>
                    <FormattedMessage id="project.global.buttons.buy"/>
                </button>
            </div>

        </div>

    );

}

const mapStateToProps = (state) => ({
    cart: selectors.getShoppingCart(state)
});

ShoppingCart = connect(mapStateToProps)(injectIntl(ShoppingCart));

export default ShoppingCart;