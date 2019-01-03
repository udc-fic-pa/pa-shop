import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, FormattedDate, FormattedTime, injectIntl} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';

class OrderDetails extends React.Component {

    componentDidMount() {
        this.props.findOrder(this.props.match.params.id);
    }

    render() {

        const order = this.props.order;

        if (!order) {
            return null;
        }

        return (
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">
                        <FormattedMessage id='project.global.fields.purchaseOrder'/> {order.id} 
                    </h5>
                    <h6 className="card-subtitle text-muted">
                        <FormattedDate value={new Date(order.date)}/> - <FormattedTime value={new Date(order.date)}/>
                    </h6>
                    <p className="card-text">
                        {order.postalAddress} - {order.postalCode} 
                    </p>
                </div>
            </div>
        );

    }

}

const mapStateToProps = state => ({
    order: selectors.getOrder(state)
});

const mapDispatchToProps = {
    findOrder: actions.findOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderDetails));