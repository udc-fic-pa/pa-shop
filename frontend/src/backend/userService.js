import {config, appFetch, setServiceToken, getServiceToken, removeServiceToken, setReauthenticationCallback} from './appFetch';

export const login = (userName, password, onSuccess, onErrors, reauthenticationCallback) => {

    const parameters = new FormData();

    parameters.append("userName", userName);
    parameters.append("password", password);

    appFetch('/users/login', config('POST', parameters),
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            setReauthenticationCallback(reauthenticationCallback);
            onSuccess(authenticatedUser);
        }, 
        onErrors);

}

export const tryLoginFromServiceToken = (onSuccess, reauthenticationCallback) => {

    const serviceToken = getServiceToken();

    if (!serviceToken) {
        onSuccess();
        return;
    }

    setReauthenticationCallback(reauthenticationCallback);

    appFetch('/users/loginFromServiceToken', config('POST'),
        authenicatedUser => onSuccess(authenicatedUser),
        () => removeServiceToken()
    );

}

export const signUp = (user, onSuccess, onErrors) => 
    appFetch('/users/signUp', config('POST', user), 
        authenticatedUser => {
            setServiceToken(authenticatedUser.serviceToken);
            onSuccess(authenticatedUser);
        }, 
        onErrors);

export const logout = () => removeServiceToken();

export const updateProfile = (user, onSuccess, onErrors) => {
    appFetch(`/users/${user.id}`, config('PUT', user),
        onSuccess, onErrors);
}

export const changePassword = (id, oldPassword, newPassword, onSuccess,
    onErrors) => {

    const parameters = new FormData();

    parameters.append("oldPassword", oldPassword);
    parameters.append("newPassword", newPassword);

    appFetch(`/users/${id}/changePassword`, config('POST', parameters),
        onSuccess, onErrors);

}