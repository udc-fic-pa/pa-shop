import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Alert from 'react-bootstrap/Alert';

import * as selectors from '../selectors';
import * as actions from '../actions';
import backend from '../../../backend';
import {Pager} from '../../common';
import Products from './Products';

const FindProductsResult = () => {

    const productSearch = useSelector(selectors.getProductSearch);
    const categories = useSelector(selectors.getCategories);
    const dispatch = useDispatch();

    const handleBackNext = async (backClicked, criteria) => {

        dispatch(actions.clearProductSearch());
        
        let newCriteria;

        if (backClicked) {
            newCriteria = {...criteria, page: criteria.page-1}
        } else {
            newCriteria = {...criteria, page: criteria.page+1}
        }

        const response = await backend.catalogService.findProducts(newCriteria);

        if (response.ok) {
            dispatch(actions.findProductsCompleted({criteria: newCriteria, result: response.payload}));

        }
    }

    if (!productSearch) {
        return null;
    }

    if (productSearch.result.items.length === 0) {
        return (
            <Alert variant="danger">
                <FormattedMessage id='project.catalog.FindProductsResult.noProductsFound'/>
            </Alert>
        );
    }
    
    return (

        <div>
            <Products products={productSearch.result.items} categories={categories}/>
            <Pager 
                back={{
                    enabled: productSearch.criteria.page >= 1,
                    onClick: () => handleBackNext(true, productSearch.criteria)}}
                next={{
                    enabled: productSearch.result.existMoreItems,
                    onClick: () => handleBackNext(false, productSearch.criteria)}}/>
        </div>

    );

}

export default FindProductsResult;
