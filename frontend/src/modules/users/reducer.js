import {combineReducers} from 'redux';

import * as actionTypes from './actionTypes';

const initialState = {
    user: null
};

const user = (state = initialState.user, action) => {

    switch (action.type) {

        case actionTypes.SIGNED_UP:
            return action.authenticatedUser.user;

        case actionTypes.LOGGED_IN:
            return action.authenticatedUser.user;

        case actionTypes.LOGOUT:
            return initialState.user;

        case actionTypes.PROFILE_UPDATED:
            return action.user;

        default:
            return state;

    }

}

const reducer = combineReducers({
    user
});

export default reducer;


