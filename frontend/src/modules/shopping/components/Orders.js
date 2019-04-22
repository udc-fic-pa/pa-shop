import React from 'react';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from 'prop-types';

import OrderLink from './OrderLink';

const Orders = ({orders}) => (

    <table className="table table-striped table-hover">

        <thead>
            <tr>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.purchaseOrder'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.date'/>
                </th>
            </tr>
        </thead>

        <tbody>
            {orders.map(order => 
                <tr key={order.id}>
                    <td><OrderLink id={order.id}/></td>
                    <td>
                        <FormattedDate value={new Date(order.date)}/> - <FormattedTime value={new Date(order.date)}/>
                    </td>
                </tr>
            )}
        </tbody>

    </table>

);

Orders.propTypes = {
    orders: PropTypes.array.isRequired
};

export default Orders;

