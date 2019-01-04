import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';

const initialState = {
    postalAddress: '',
    postalCode: '',
    backendErrors: null
};

class BuyForm extends React.Component {

    constructor(props) {

        super(props);

        this.state = initialState;

    }

    handlePostalAddressChange(event) {
        this.setState({postalAddress: event.target.value});
    }

    handlePostalCodeChange(event) {
        this.setState({postalCode: event.target.value});
    }

    handleSubmit(event) {

        event.preventDefault();

        const form = $('#buy-form');

        if (form.get(0).checkValidity()) {
            this.buy();
        } else {
            this.clearMessages();
            form.get(0).classList.add('was-validated');
        }

    }

    buy() {

        this.props.buy(this.props.shoppingCartId, this.state.postalAddress,
            this.state.postalCode, 
            () => this.props.history.push('/shopping/purchase-completed'),
            errors => this.setBackendErrors(errors));

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
                <Errors errors={this.state.backendErrors}
                    handleClose={() => this.handleErrorsClose()}/>
                <div className="card bg-light border-dark">
                    <h5 className="card-header">
                        <FormattedMessage id="project.shopping.BuyForm.title"/>
                    </h5>
                    <div className="card-body">
                        <form id="buy-form" className="needs-validation" noValidate 
                            onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="postalAddress" className="col-md-3 col-form-label">
                                    <FormattedMessage id="project.global.fields.postalAddress"/>
                                </label>
                                <div className="col-md-4">
                                    <input type="text" id="postalAddress" className="form-control"
                                        value={this.state.userName}
                                        onChange={(e) => this.handlePostalAddressChange(e)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="postalCode" className="col-md-3 col-form-label">
                                    <FormattedMessage id="project.global.fields.postalCode"/>
                                </label>
                                <div className="col-md-4">
                                    <input type="text" id="postalCode" className="form-control"
                                        value={this.state.password}
                                        onChange={(e) => this.handlePostalCodeChange(e)}
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-md-3 col-md-1">
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.shopping.BuyForm.title"/>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );

    }

}

const mapStateToProps = (state) => ({
    shoppingCartId: selectors.getShoppingCart(state).id
});

const mapDispatchToProps = {
    buy: actions.buy
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BuyForm));