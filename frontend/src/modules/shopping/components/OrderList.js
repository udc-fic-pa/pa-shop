import React from 'react';
import {connect} from 'react-redux';

import Orders from './Orders';
import * as actions from '../actions';

class OrderList extends React.Component {

    componentDidMount() {
        this.props.dispatch(actions.findOrders({page: 0}));
    }

    render() {
        return (
            <Orders/>
        );
    }

}

export default connect()(OrderList);