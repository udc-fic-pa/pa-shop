import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {injectIntl, FormattedMessage} from 'react-intl';

import {Errors, Success} from '../../common';
import * as actions from '../actions';


const initialState = {
    name: '',
    success: null,
    backendErrors: null
};

class AddProject extends React.Component {

    constructor(props) {

        super(props);

        this.state = initialState;

    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {

        event.preventDefault();

        const form = $('#add-project-form');

        if (form.get(0).checkValidity()) {
            this.createProject();
            form.get(0).classList.remove('was-validated');
        } else {
            this.clearMessages();
            form.get(0).classList.add('was-validated');
        }

    }

    createProject() {

        this.props.dispatch(actions.add(
            {name: this.state.name.trim()},
            project => this.setSuccess(
                this.props.intl.formatMessage(
                    {id: 'project.projects.AddProject.success'},
                    {projectName: project.name})),
            errors => this.setBackendErrors(errors)
        ));

    }

    handleSuccessClose() {
        this.setState({success: null});
    }

    handleErrorsClose() {
        this.setState({backendErrors: null});
    }

    setSuccess(success) {
        this.setState({success, backendErrors: null, name: ''});
    }

    setBackendErrors(backendErrors) {
        this.setState({success: null, backendErrors});
    }

    clearMessages() {
        this.setState({success: null, backendErrors: null});
    }

    render() {

        return (
            <div>
                <Success message={this.state.success} handleClose={() => this.handleSuccessClose()}/>
                <Errors errors={this.state.backendErrors} handleClose={() => this.handleErrorsClose()}/>  
                <div className="card bg-light border-dark">
                    <h5 className="card-header">
                        <FormattedMessage id="project.projects.AddProject.title"/>
                    </h5>
                    <div className="card-body">
                        <form id="add-project-form" className="needs-validation" noValidate onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="form-group row">
                                <label htmlFor="name" className="col-md-2 col-form-label">
                                    <FormattedMessage id="project.global.fields.name"/>
                                </label>
                                <div className="col-md-4">
                                    <input type="text" id="name" 
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={(e) => this.handleNameChange(e)}
                                        autoFocus
                                        required/>
                                    <div className="invalid-feedback">
                                        <FormattedMessage id='project.global.validator.required'/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="offset-md-2 col-md-1">
                                    <button type="submit" className="btn btn-primary">
                                        <FormattedMessage id="project.global.buttons.add"/>
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

AddProject = connect()(injectIntl(AddProject));

export default AddProject;
