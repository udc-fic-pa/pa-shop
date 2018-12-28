import React from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';

import ShoppingCartItem from './ShoppingCartItem';

let ShoppingCart = ({cart, edit}) => {

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
                        <ShoppingCartItem key={index} item={item} index={index}
                            edit={edit}/>
                    )}
                </tbody>

            </table>

            <p className="text-center font-weight-bold">
                <FormattedMessage id='project.global.fields.totalPrice'/>: {cart.totalPrice}€
            </p>

        </div>

    );

}

ShoppingCart = injectIntl(ShoppingCart);

export default ShoppingCart;