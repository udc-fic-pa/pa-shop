import * as actionTypes from './actionTypes';
import backend from '../../backend';
import app from '../app';

const updated = task => ({
    type: actionTypes.UPDATED,
    task
});

export const updateCompletedTask = (id, completed) => dispatch =>
    backend.taskService.updateCompletedTask(id, completed,
        task => dispatch(updated(task)),
        errors => dispatch(app.actions.error(new Error(errors.globalError)))
    );

export const rename = (id, newName, onSuccess, onErrors) => dispatch => 
    backend.taskService.renameTask(id, newName,
        task => {
            dispatch(updated(task));
            onSuccess(task);
        },
       onErrors);

const removed = id => ({
    type: actionTypes.REMOVED,
    id
});

export const remove = id => dispatch =>
    backend.taskService.removeTask(id,
        () => dispatch(removed(id)),
        errors => dispatch(app.actions.error(new Error(errors.globalError)))
    );

const added = task => ({
    type: actionTypes.ADDED,
    task
});

export const add = (task, onSuccess, onErrors) => dispatch =>
    backend.taskService.addTask(task,
        task => {
            dispatch(added(task));
            onSuccess(task);
        },
        onErrors);

const projectTasksLoaded = tasks => ({
    type: actionTypes.PROJECT_TASKS_LOADED,
    tasks
});

export const cleanProjectTasks = () => ({
    type: actionTypes.CLEAN_PROJECT_TASKS
});

export const getProjectTasks = projectId => dispatch =>
    backend.taskService.findTasks(projectId,
        tasks => dispatch(projectTasksLoaded(tasks)),
        errors => dispatch(app.actions.error(new Error(errors.globalError)))
    );
