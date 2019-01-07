import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import ShoppingItem from './ShoppingItem';

const ShoppingItemList = ({list, edit}) => {

    if (list.items.length === 0) {
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
                    {list.items.map((item, index) => 
                        <ShoppingItem key={index} item={item} index={index}
                            edit={edit}/>
                    )}
                </tbody>

            </table>

            <p className="text-center font-weight-bold">
                <FormattedMessage id='project.global.fields.totalPrice'/>: {list.totalPrice}€
            </p>

        </div>

    );

}

ShoppingItemList.propTypes = {
    list: PropTypes.object.isRequired,
    edit: PropTypes.bool
}

export default ShoppingItemList;