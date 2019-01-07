import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import {Link} from 'react-router-dom';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from '../../common';

const FindOrdersResult = ({orderSearch, previousFindOrdersResultPage, nextFindOrdersResultPage}) => {

    if (!orderSearch) {
        return null;
    }

    if (orderSearch.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.shopping.Orders.noOrders'/>
            </div>
        );
    }

    return (

        <div>

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
                    {orderSearch.result.items.map((order, index) => 
                        <tr key={index}>
                            <td><Link to={`/shopping/order-details/${order.id}`}>{order.id}</Link></td>
                            <td>
                                <FormattedDate value={new Date(order.date)}/> - <FormattedTime value={new Date(order.date)}/>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>

            <Pager 
                back={{
                    enabled: orderSearch.criteria.page >= 1,
                    handle: () => previousFindOrdersResultPage(orderSearch.criteria)}}
                next={{
                    enabled: orderSearch.result.existMoreItems,
                    handle: () => nextFindOrdersResultPage(orderSearch.criteria)}}/>

        </div>

    );

}


const mapStateToProps = state => ({
    orderSearch: selectors.getOrderSearch(state)
});

const mapDispatchToProps = {
    findOrders: actions.findOrders,
    previousFindOrdersResultPage: actions.previousFindOrdersResultPage,
    nextFindOrdersResultPage: actions.nextFindOrdersResultPage
};

export default connect(mapStateToProps, mapDispatchToProps)(FindOrdersResult);