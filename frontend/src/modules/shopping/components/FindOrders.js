import {useEffect} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

const FindOrders = ({dispatch, history}) => {

    useEffect(() => {

        dispatch(actions.findOrders({page: 0}));
        history.push('/shopping/find-orders-result');

    });

    return null;

}

export default connect()(FindOrders);