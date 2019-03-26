import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';
import users from '../../users';

class FindOrders extends React.Component {

    componentDidMount() {

        this.props.dispatch(actions.findOrders({userId: this.props.userId, page: 0}));
        this.props.history.push('/shopping/find-orders-result');

    }

    render() {
        return null;
    }

}

const mapStateToProps = state => ({
    userId: users.selectors.getUser(state).id
});

export default connect(mapStateToProps)(FindOrders);