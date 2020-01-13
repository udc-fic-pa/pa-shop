import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage, FormattedNumber} from 'react-intl';

import users from '../../users';
import * as selectors from '../selectors';
import * as actions from '../actions';
import {AddToShoppingCart} from '../../shopping';
import {BackLink} from '../../common';

const ProductDetails = ({match, history}) => {

    const productId = match.params.id;
    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const product = useSelector(selectors.getProduct);
    const categories = useSelector(selectors.getCategories);
    const dispatch = useDispatch();

    useEffect(() => {

        const id = Number(productId);

        if (!Number.isNaN(id)) {
            dispatch(actions.findProductById(id));
        }

        return () => dispatch(actions.clearProduct());

    }, [productId, dispatch]);

    if (!product) {
        return null;
    }
        
    return (

        <div>

            <BackLink/>
            
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle text-muted">
                        <FormattedMessage id='project.global.fields.department'/>:&nbsp;
                            {selectors.getCategoryName(categories, product.categoryId)}
                    </h6>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text font-weight-bold">
                        <FormattedMessage id='project.global.fields.price'/>
                        : <FormattedNumber value={product.price}/>€
                    </p>
                </div>
            </div>

            {loggedIn && 
                <div>
                    <br/>
                    <AddToShoppingCart productId={product.id} 
                        history={history}/>
                </div>
            }

        </div>

    );

}

export default ProductDetails;