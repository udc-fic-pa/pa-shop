import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';
import users from '../users';

const initialState = {
    allProjects: null
};

const allProjects = (state = initialState.allProjects, action) => {

    switch (action.type) {

        case users.actionTypes.LOGGED_IN:
            return action.authenticatedUser.projects;

        case users.actionTypes.SIGNED_UP:
            return action.authenticatedUser.projects;

        case users.actionTypes.LOGOUT:
            return initialState.allProjects;

        case actionTypes.UPDATED: 

            return state.map(project =>
                project.id === action.project.id ? 
                    action.project :
                    project
            );

        case actionTypes.REMOVED: {

            const index = state.findIndex(
                project => project.id === action.id);

            return index === -1 ? state :
                [...state.slice(0, index), ...state.slice(index+1)];

        }

        case actionTypes.ADDED:
            return [...state, action.project];

        default:
            return state;

    }

}


const reducer = combineReducers({
    allProjects
});

export default reducer;


