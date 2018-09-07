import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import Project from './Project';
import {Tasks, AddTask} from '../../tasks';
import * as actions from '../actions';

class ProjectDetails extends React.Component {

    componentDidMount() {

        const projectId = Number(this.props.match.params.id);
        
        this.props.dispatch(actions.projectSelected(projectId));

    }

    render() {
        return (
            <div>
                <div className="card border-dark">
                    <h5 className="card-header">
                        <FormattedMessage id="project.projects.ProjectDetails.title"/>
                    </h5>
                    <div className="card-body">
                        <Project/>
                        <hr/>
                        <Tasks/>
                        <AddTask/>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect()(ProjectDetails);
