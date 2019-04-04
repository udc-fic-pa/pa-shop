import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import ShoppingItemList from './ShoppingItemList';

class OrderDetails extends React.Component {

    componentDidMount() {

        const id = Number(this.props.match.params.id);

        if (!Number.isNaN(id)) {   
            this.props.findOrder(id);
        }

    }

    render() {

        const order = this.props.order;

        if (!order) {
            return null;
        }

        return (

            <div>

                {this.props.match.params.withBackLink === 'withBackLink' &&
                <p>
                    <Link to="/shopping/find-orders-result">
                        <FormattedMessage id='project.shopping.OrderDetails.backToOrders'/>
                    </Link>
                </p>
                }

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

                <ShoppingItemList list={order}/>

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

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);