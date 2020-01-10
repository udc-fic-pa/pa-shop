import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, FormattedNumber} from 'react-intl';

import users from '../../users';
import * as selectors from '../selectors';
import * as actions from '../actions';
import {AddToShoppingCart} from '../../shopping';
import {BackLink} from '../../common';

const ProductDetails = ({loggedIn, product, categories, findProductById, clearProduct, match, history}) => {

    const productId = match.params.id;

    useEffect(() => {

        const id = Number(productId);

        if (!Number.isNaN(id)) {
            findProductById(id);
        }

        return clearProduct;

    }, [productId, findProductById, clearProduct]);

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

const mapStateToProps = (state) => ({
    loggedIn: users.selectors.isLoggedIn(state),
    product: selectors.getProduct(state),
    categories: selectors.getCategories(state)
});

const mapDispatchToProps = {
    findProductById: actions.findProductById,
    clearProduct: actions.clearProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);