import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import {Pager} from '../../common';
import Orders from './Orders';

const FindOrdersResult = ({orderSearch, previousFindOrdersResultPage, nextFindOrdersResultPage}) => {

    if (!orderSearch) {
        return null;
    }

    if (orderSearch.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.shopping.FindOrdersResult.noOrders'/>
            </div>
        );
    }

    return (

        <div>
            <Orders orders={orderSearch.result.items}/>
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