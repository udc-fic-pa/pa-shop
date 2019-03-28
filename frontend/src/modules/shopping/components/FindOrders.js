import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

class FindOrders extends React.Component {

    componentDidMount() {

        this.props.dispatch(actions.findOrders({page: 0}));
        this.props.history.push('/shopping/find-orders-result');

    }

    render() {
        return null;
    }

}

export default connect()(FindOrders);