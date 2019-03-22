import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import OrderLink from './OrderLink';

const PurchaseCompleted = ({orderId}) => orderId && (
    <div className="alert alert-success" role="alert">
        <FormattedMessage id="project.shopping.PurchaseCompleted.purchaseOrderGenerated"/>:
        &nbsp;
        <OrderLink id={orderId}/>
    </div>
);

const mapStateToProps = state => ({
    orderId: selectors.getLastOrderId(state)
});

export default connect(mapStateToProps)(PurchaseCompleted);