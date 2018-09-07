import {config, appFetch} from './appFetch';

export const findTasks = (projectId, onSuccess, onErrors) => 
    appFetch(`/tasks?projectId=${projectId}`,
        config('GET', null), onSuccess, onErrors);

export const addTask = (task, onSuccess, onErrors) =>
    appFetch('/tasks', 
        config('POST', task), onSuccess, onErrors);

export const updateCompletedTask = (taskId, completed, onSuccess, onErrors) =>
    appFetch(`/tasks/${taskId}`, 
        config('PATCH', {completed}), onSuccess, onErrors);

export const renameTask = (taskId, newName, onSuccess, onErrors) =>
    appFetch(`/tasks/${taskId}`, 
        config('PATCH', {name: newName}), onSuccess, onErrors);

export const removeTask = (taskId, onSuccess, onErrors) =>
    appFetch(`/tasks/${taskId}`,
        config('DELETE'), onSuccess, onErrors);