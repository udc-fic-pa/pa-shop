import {config, appFetch} from './appFetch';

export const addProject = (project, onSuccess, onErrors) => 
    appFetch('/projects', 
        config('POST', project), onSuccess, onErrors);

export const renameProject = (projectId, newName, onSuccess, onErrors) => 
    appFetch(`/projects/${projectId}`, 
        config('PATCH', {name: newName}), onSuccess, onErrors);

export const removeProject = (projectId, onSuccess, onErrors) =>
    appFetch(`/projects/${projectId}`,
        config('DELETE'), onSuccess, onErrors);
