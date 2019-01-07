import React from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import PropTypes from 'prop-types';

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
            {orders.map((order, index) => 
                <tr key={index}>
                    <td><Link to={`/shopping/order-details/${order.id}`}>{order.id}</Link></td>
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

