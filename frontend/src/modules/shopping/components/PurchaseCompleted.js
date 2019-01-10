import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

import * as selectors from '../selectors';

const PurchaseCompleted = ({orderId}) => orderId && (
    <div className="alert alert-success" role="alert">
        <FormattedMessage id="project.shopping.PurchaseCompleted.purchaseOrderGenerated"/>:
        &nbsp;
        <Link to={`/shopping/order-details/${orderId}/withoutBackLink`}>{orderId}</Link>
    </div>
);

const mapStateToProps = state => ({
    orderId: selectors.getLastOrderId(state)
});

export default connect(mapStateToProps)(PurchaseCompleted);