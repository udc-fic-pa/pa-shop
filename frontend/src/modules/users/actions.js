import * as actionTypes from './actionTypes';
import backend from '../../backend';

const signedUp = authenticatedUser => ({
    type: actionTypes.SIGNED_UP,
    authenticatedUser
});

export const signUp = (user, onSuccess, onErrors) => dispatch =>
    backend.userService.signUp(user,
        authenticatedUser => {
            dispatch(signedUp(authenticatedUser));
            onSuccess();
        },
        onErrors);

const loggedIn = authenticatedUser => ({
    type: actionTypes.LOGGED_IN,
    authenticatedUser
});

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) => dispatch =>
    backend.userService.login(userName, password,
        authenticatedUser => {
            dispatch(loggedIn(authenticatedUser));
            onSuccess();
        },
        onErrors,
        reauthenticationCallback
    );

export const tryLoginFromServiceToken = reauthenticationCallback => dispatch =>
    backend.userService.tryLoginFromServiceToken(
        authenticatedUser => {
            if (authenticatedUser) {
                dispatch(loggedIn(authenticatedUser));
            }
        },
        reauthenticationCallback
    );
    

export const logout = () => {

    backend.userService.logout();

    return {type: actionTypes.LOGOUT};

};

export const profileUpdated = user => ({
    type: actionTypes.PROFILE_UPDATED,
    user
})

export const updateUserProfile = (user, onSuccess, onErrors) => dispatch =>
    backend.userService.updateUserProfile(user, 
        user => {
            dispatch(profileUpdated(user));
            onSuccess();
        },
        onErrors);

export const changePassword = (id, oldPassword, newPassword, onSuccess, onErrors) => dispatch =>
    backend.userService.changePassword(id, oldPassword, newPassword, onSuccess, onErrors);