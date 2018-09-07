import backend from '../../backend';
import tasks from '../tasks';
import * as actionTypes from './actionTypes';
import app from '../app';

export const projectSelected = projectId => dispatch =>
    Promise.resolve(dispatch(tasks.actions.cleanProjectTasks()))
        .then(dispatch(tasks.actions.getProjectTasks(projectId)));

const updated = project => ({
    type: actionTypes.UPDATED,
    project
});

export const rename = (projectId, newName, onSuccess, onErrors) => 
    (dispatch, getState) => 
        backend.projectService.renameProject(projectId, newName,
            project => {
                dispatch(updated(project));
                onSuccess(project);
            },
            onErrors);

const removed = id => ({
    type: actionTypes.REMOVED,
    id
});

export const remove = projectId => (dispatch, getState) =>
    backend.projectService.removeProject(projectId,
        () => dispatch(removed(projectId)),
        errors => dispatch(app.actions.error(new Error(errors.globalError)))
    );

const added = project => ({
    type: actionTypes.ADDED,
    project
});

export const add = (project, onSuccess, onErrors) => dispatch => 
    backend.projectService.addProject(project, 
        project => {
            dispatch(added(project));
            onSuccess(project);
        },
        onErrors);
    
        
        