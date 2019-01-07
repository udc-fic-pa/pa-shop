import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import * as actions from '../actions';
import {Pager} from '../../common';

const FindProductsResult = ({productSearch, categories, previousFindProductsResultPage, nextFindProductsResultPage}) => {

    if (!productSearch) {
        return null;
    }

    if (productSearch.result.items.length === 0) {
        return (
            <div className="alert alert-danger" role="alert">
                <FormattedMessage id='project.catalog.FindProductsResult.noProductsFound'/>
            </div>
        );
    }
    
    return (

        <div>

            <table className="table table-striped table-hover">

                <thead>
                    <tr>
                        <th scope="col">
                            <FormattedMessage id='project.global.fields.department'/>
                        </th>
                        <th scope="col">
                            <FormattedMessage id='project.global.fields.name'/>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {productSearch.result.items.map((product, index) => 
                        <tr key={index}>
                            <td>{selectors.getCategory(categories, product.categoryId).name}</td>
                            <td><Link to={`/catalog/product-details/${product.id}/withBackLink`}>{product.name}</Link></td>
                        </tr>
                    )}
                </tbody>

            </table>

            <Pager 
                back={{
                    enabled: productSearch.criteria.page >= 1,
                    handle: () => previousFindProductsResultPage(productSearch.criteria)}}
                next={{
                    enabled: productSearch.result.existMoreItems,
                    handle: () => nextFindProductsResultPage(productSearch.criteria)}}/>

        </div>

    );

}

const mapStateToProps = (state) => ({
    productSearch: selectors.getProductSearch(state),
    categories: selectors.getCategories(state)
});

const mapDispatchToProps = {
    previousFindProductsResultPage: actions.previousFindProductsResultPage,
    nextFindProductsResultPage: actions.nextFindProductsResultPage
}

export default connect(mapStateToProps, mapDispatchToProps)(FindProductsResult);