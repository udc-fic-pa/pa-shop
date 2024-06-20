import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import * as selectors from '../selectors';
import backend from '../../../backend';
import {Pager} from '../../common';
import Orders from './Orders';

const FindOrdersResult = () => {

    const orderSearch = useSelector(selectors.getOrderSearch);
    const dispatch = useDispatch();

    const handleBackNext = async (backClicked, criteria) => {

        dispatch(actions.clearOrderSearch());
        
        let newCriteria;

        if (backClicked) {
            newCriteria = {page: criteria.page-1}
        } else {
            newCriteria = {page: criteria.page+1}
        }

        const response = await backend.shoppingService.findOrders(newCriteria);

        if (response.ok) {
            dispatch(actions.findOrdersCompleted({criteria: newCriteria, result: response.payload}));

        }

    }

    if (!orderSearch) {
        return null;
    }

    if (orderSearch.result.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.shopping.FindOrdersResult.noOrders'/>
            </div>
        );
    }

    return (

        <div>
            <Orders orders={orderSearch.result.items}/>
            <Pager 
                back={{
                    enabled: orderSearch.criteria.page >= 1,
                    onClick: () => handleBackNext(true, orderSearch.criteria)}}
                next={{
                    enabled: orderSearch.result.existMoreItems,
                    onClick: () => handleBackNext(false, orderSearch.criteria)}}/>
        </div>

    );

}

export default FindOrdersResult;
