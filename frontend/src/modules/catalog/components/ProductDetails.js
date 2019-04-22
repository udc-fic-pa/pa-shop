import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage, FormattedNumber} from 'react-intl';

import users from '../../users';
import * as selectors from '../selectors';
import * as actions from '../actions';
import {AddToShoppingCart} from '../../shopping';
import {BackLink} from '../../common';

class ProductDetails extends React.Component {

    componentDidMount() {

        const id = Number(this.props.match.params.id);

        if (!Number.isNaN(id)) {
            this.props.findProductById(id);
        }
    
    }

    componentWillUnmount() {
        this.props.clearProduct();
    }

    render() {

        const product = this.props.product;

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
                                {selectors.getCategoryName(this.props.categories, product.categoryId)}
                        </h6>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text font-weight-bold">
                            <FormattedMessage id='project.global.fields.price'/>
                            : <FormattedNumber value={product.price}/>€
                        </p>
                    </div>
                </div>

                {this.props.loggedIn && 
                    <div>
                        <br/>
                        <AddToShoppingCart productId={product.id} 
                            history={this.props.history}/>
                    </div>
                }

            </div>
    
        );

    }

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