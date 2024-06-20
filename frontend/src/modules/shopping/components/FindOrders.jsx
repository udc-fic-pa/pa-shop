import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import * as actions from '../actions';

const FindOrders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        dispatch(actions.findOrders({page: 0}));
        navigate('/shopping/find-orders-result');

    });

    return null;

}

export default FindOrders;
