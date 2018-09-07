import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';
import users from '../users';

const initialState = {
    selectedProjectTasks: []
};

const selectedProjectTasks = (state = initialState.selectedProjectTasks, action) => {

    switch (action.type) {

        case actionTypes.CLEAN_PROJECT_TASKS:
            return initialState.selectedProjectTasks;

        case actionTypes.PROJECT_TASKS_LOADED: {
            return action.tasks;
        }

        case actionTypes.UPDATED: {

            return state.map(task => 
                task.id === action.task.id ?
                    action.task :
                    task
            );

        }

        case actionTypes.REMOVED: {

            const index = state.findIndex(
                task => task.id === action.id);

            if (index === -1) {
                return state;
            }

            return [...state.slice(0, index),
                ...state.slice(index+1)];

        }

        case actionTypes.ADDED: {
            return [...state, action.task];
        }

        case users.actionTypes.LOGOUT:
            return initialState.selectedProjectTasks;

        default:
            return state;

    }
    
}

const reducer = combineReducers({
    selectedProjectTasks
});

export default reducer;
