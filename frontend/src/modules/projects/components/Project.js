import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {injectIntl} from 'react-intl';

import {NameEditor, ConfirmDialog} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors'

let Project = ({project, handleRename, handleRemove, intl}) => (

    <div>
        {!project ? "" :
            <div>
                <NameEditor
                    id={"projects-rename-" + project.id}
                    name={project.name} 
                    title={intl.formatMessage({id: 'project.projects.Project.NameEditor.title'})}
                    handleSave={(newName, onSuccess, onErrors) => 
                        handleRename(project.id, newName, onSuccess, onErrors)}/>
                {' '}
                <ConfirmDialog
                    id={"projects-confirm-remove-" + project.id}
                    icon="trash"
                    headerTitle={intl.formatMessage({id: 'project.projects.Project.removeConfirmDialog.headerTitle'})}
                    bodyTitle={intl.formatMessage({id: 'project.projects.Project.removeConfirmDialog.bodyTitle'})}
                    handleConfirm={() => handleRemove(project.id)}/>
                {' '}
                <span className="font-weight-bold">{project.name}</span>
            </div>
        }
    </div>

);

const mapStateToProps = (state, {match}) => ({
    project: selectors.getProject(state, Number(match.params.id))
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleRename(projectId, newName, onSuccess, onErrors) {
        dispatch(actions.rename(projectId, newName, onSuccess, onErrors))
    },
    handleRemove(projectId) {
        dispatch(actions.remove(projectId));
        ownProps.history.push('/');
    }
});

Project = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(injectIntl(Project)));

export default Project;
