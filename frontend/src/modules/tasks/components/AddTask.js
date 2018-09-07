import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';
import {injectIntl, FormattedMessage} from 'react-intl';

import * as actions from '../actions';
import { Errors } from '../../common';

const initialState = {
    name: '',
    backendErrors: null
};

class AddTask extends React.Component {

    constructor(props) {

        super(props);

        this.state = initialState;

    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {

        event.preventDefault();

        const form = $('#add-task-form');

        if (form.get(0).checkValidity()) {
            this.createTask();
            form.get(0).classList.remove('was-validated');
        } else {
            this.clearMessages();
            form.get(0).classList.add('was-validated');
        }

    }

    createTask() {

        const projectId = Number(this.props.match.params.id);

        this.props.dispatch(actions.add(
            {projectId, name: this.state.name.trim(), completed: false},
            () => this.setSuccess(),
            errors => this.setBackendErrors(errors)
        ));

    }

    handleErrorsClose() {
        this.setState({backendErrors: null});
    }

    setSuccess() {
        this.setState({backendErrors: null, name: ''});
    }

    setBackendErrors(backendErrors) {
        this.setState({backendErrors});
    }

    clearMessages() {
        this.setState({backendErrors: null});
    }

    render() {

        return (
            <div>
                <p/>
                <form id="add-task-form" className="needs-validation" noValidate onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group row">
                        <div className="col-md-4">
                            <input type="text" id="name" 
                                className="form-control" 
                                placeholder={this.props.intl.formatMessage({id: 'project.tasks.AddTask.placeHolder'})}
                                value={this.state.name}
                                onChange={(e) => this.handleNameChange(e)}
                                autoFocus
                                required/>
                                <div className="invalid-feedback">
                                    <FormattedMessage id='project.global.validator.required'/>
                                </div>
                        </div>
                    </div>
                </form>
                <Errors errors={this.state.backendErrors} handleClose={() => this.handleErrorsClose()}/>
            </div>
        );
    }

}

export default withRouter(connect()(injectIntl(AddTask)));
