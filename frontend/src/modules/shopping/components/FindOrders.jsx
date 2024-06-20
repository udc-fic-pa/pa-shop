import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import * as actions from '../actions';
import backend from '../../../backend';

const FindOrders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const findOrders = async (criteria) => {
            const response = await backend.shoppingService.findOrders(criteria);
            if (response.ok) {
                dispatch(actions.findOrdersCompleted({criteria, result: response.payload}));
            }
        }

        dispatch(actions.clearOrderSearch());
        findOrders({page: 0});
        navigate('/shopping/find-orders-result');

    });

    return null;

}

export default FindOrders;
