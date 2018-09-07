
const getModuleState = state => state.projects;

export const getProjects = state => getModuleState(state).allProjects;

export const getProject = (state, id) => 
    getModuleState(state).allProjects.find(project => project.id === id);
