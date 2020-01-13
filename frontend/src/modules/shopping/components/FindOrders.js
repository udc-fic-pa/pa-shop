import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import * as actions from '../actions';

const FindOrders = ({history}) => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(actions.findOrders({page: 0}));
        history.push('/shopping/find-orders-result');

    });

    return null;

}

export default FindOrders;