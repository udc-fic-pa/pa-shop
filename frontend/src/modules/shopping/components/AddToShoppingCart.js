import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import $ from 'jquery';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

class AddToShoppingCart extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            quantity: 1,
            backendErrors: null
        };

    }

    handleQuantityChange(event) {
        this.setState({quantity: Number(event.target.value)});
    }

    handleSubmit(event) {

        event.preventDefault();

        const form = $('#add-to-cart-form');

        if (form.get(0).checkValidity()) {
            this.props.addToShoppingCart(this.props.shoppingCartId, 
                this.props.productId, this.state.quantity,
                () => this.props.history.push('/'),
                errors => this.setBackendErrors(errors));
        } else {
            this.clearMessages();
            form.get(0).classList.add('was-validated');
        }

    }

    setBackendErrors(backendErrors) {
        this.setState({backendErrors});
    }

    clearMessages() {
        this.setState({backendErrors: null});
    }

    handleErrorsClose() {
        this.setState({backendErrors: null});
    }

    render() {

        return (
            <div>
                <Errors errors={this.state.backendErrors} handleClose={() => this.handleErrorsClose()}/>
                <form id="add-to-cart-form" className="needs-validation" noValidate onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group row">
                        <label htmlFor="quantity" className="offset-md-5 col-md-1 col-form-label">
                            <FormattedMessage id="project.global.fields.quantity"/>
                        </label>
                        <div className="col-md-2">
                            <input type="number" id="quantity" className="form-control"
                                value={this.state.quantity}
                                onChange={(e) => this.handleQuantityChange(e)}
                                autoFocus
                                min="1" />
                            <div className="invalid-feedback">
                                <FormattedMessage id='project.global.validator.incorrectQuantity'/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="offset-md-6 col-md-1">
                            <button type="submit" className="btn btn-primary">
                                <FormattedMessage id="project.shopping.AddToCart.add"/>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );

    }

}

const mapStateToProps = (state) => ({
    shoppingCartId: selectors.getShoppingCart(state).id
});

const mapDispatchToProps = {
    addToShoppingCart: actions.addToShoppingCart
}

AddToShoppingCart = withRouter(connect(
    mapStateToProps, mapDispatchToProps)(AddToShoppingCart));

AddToShoppingCart.propTypes = {
    productId: PropTypes.number.isRequired
};

export default AddToShoppingCart;
