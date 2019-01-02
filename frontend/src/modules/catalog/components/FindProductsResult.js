import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl} from 'react-intl';

import * as selectors from '../selectors';
import * as actions from '../actions';

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

    let previousButtonStatus =  
        productSearch.criteria.page >= 1 ? "" : "disabled";

    let nextButtonStatus = productSearch.result.existMoreItems ?
        "" : "disabled";
    
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

            <nav aria-label="page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${previousButtonStatus}`}>
                        <button className="page-link"
                            onClick={() => previousFindProductsResultPage(productSearch.criteria)}>
                            <FormattedMessage id='project.global.buttons.previous'/>
                        </button>
                    </li>
                    <li className={`page-item ${nextButtonStatus}`}>
                        <button className="page-link"
                            onClick={() => nextFindProductsResultPage(productSearch.criteria)}>
                            <FormattedMessage id='project.global.buttons.next'/>
                        </button>
                    </li>
                </ul>
            </nav>

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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FindProductsResult));