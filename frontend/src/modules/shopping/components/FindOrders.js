import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';
import FindOrdersResult from './FindOrdersResult';

class FindOrders extends React.Component {

    componentDidMount() {
        this.props.dispatch(actions.findOrders({page: 0}));
    }

    render() {
        return (<FindOrdersResult/>);
    }

}

export default connect()(FindOrders);