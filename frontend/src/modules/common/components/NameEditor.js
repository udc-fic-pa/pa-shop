import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {FormattedMessage, injectIntl} from 'react-intl';

import { Errors } from '../../common';

class NameEditor extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            name: props.name,
            backendErrors: null
        };

        this.formId = `${this.props.id}-form`;

    }

    componentDidMount() {
        this.$modal = $(this.modal);
    }

    handleClose() {
        this.setState({name: this.props.name, backendErrors: null});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {

        event.preventDefault();

        const form = $(`#${this.formId}`);

        if (form.get(0).checkValidity()) {
            this.rename();
            form.get(0).classList.remove('was-validated');
        } else {
            this.clearMessages();
            form.get(0).classList.add('was-validated');
        }

    }

    rename() {

        this.props.handleSave(
            this.state.name.trim(),
            () => {
                this.setBackendErrors(null);
                this.$modal.modal('hide');
            },
            errors => this.setBackendErrors(errors)
        );

    }

    handleErrorsClose() {
        this.setBackendErrors(null);
    }

    setBackendErrors(backendErrors) {
        this.setState({backendErrors});
    }

    clearMessages() {
        this.setState({backendErrors: null});
    }

    render() {

        return (
    
            <span>
                <button type="button" className="btn btn-link btn-sm" 
                    data-toggle="modal" data-target={"#" + this.props.id}>
                    <span className="fas fa-edit"></span>
                </button>
                <div id={this.props.id} ref={modal => this.modal = modal} 
                    className="modal fade" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.title}</h5>
                                <button type="button" className="close" 
                                    data-dismiss="modal" aria-label="Close" 
                                    onClick={() => this.handleClose()}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Errors errors={this.state.backendErrors} 
                                    handleClose={() => this.handleErrorsClose()}/>
                                <form id={`${this.formId}`} className="needs-validation" noValidate onSubmit={(e) => this.handleSubmit(e)}>
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-form-label">
                                            <FormattedMessage id="project.global.fields.name"/>
                                        </label>
                                        <input type="text" id="name" 
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={(e) => this.handleNameChange(e)}
                                            required/>
                                        <div className="invalid-feedback">
                                            <FormattedMessage id='project.global.validator.required'/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">
                                            <FormattedMessage id="project.global.buttons.save"/>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
    
        );

    }

}

NameEditor.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired
}

export default injectIntl(NameEditor);
