import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import {Link} from 'react-router-dom';

import * as actions from '../actions';
import * as selectors from '../selectors';

const FindOrdersResult = ({orderSearch, previousOrdersPage, nextOrdersPage}) => {

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

    let previousButtonStatus =  
        orderSearch.criteria.page >= 1 ? "" : "disabled";

    let nextButtonStatus = orderSearch.result.existMoreItems ?
        "" : "disabled";

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

            <nav aria-label="page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${previousButtonStatus}`}>
                        <button className="page-link"
                            onClick={() => previousOrdersPage(orderSearch.criteria)}>
                            <FormattedMessage id='project.global.buttons.previous'/>
                        </button>
                    </li>
                    <li className={`page-item ${nextButtonStatus}`}>
                        <button className="page-link"
                            onClick={() => nextOrdersPage(orderSearch.criteria)}>
                            <FormattedMessage id='project.global.buttons.next'/>
                        </button>
                    </li>
                </ul>
            </nav>

        </div>

    );

}


const mapStateToProps = state => ({
    orderSearch: selectors.getOrderSearch(state)
});

const mapDispatchToProps = {
    findOrders: actions.findOrders,
    previousOrdersPage: actions.previousOrdersPage,
    nextOrdersPage: actions.nextOrdersPage
};

export default connect(mapStateToProps, mapDispatchToProps)(FindOrdersResult);