const getModuleState = state => state.tasks;

export const getSelectedProjectTasks = state => 
    getModuleState(state).selectedProjectTasks;