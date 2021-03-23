import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './actions';
import backend from '../../backend';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

afterEach(() => backend.shoppingService.buy.mockRestore());

test('buy - success', () => {

    const orderId = 1;
    const backendBuySpy = jest.spyOn(backend.shoppingService, 'buy').mockImplementation(
        (_shoppingCartId, _postalAddress, _postalCode, onSuccess, _onErrors) => 
            onSuccess({id: orderId}));
    const shoppingCartId = 1;
    const postalAddress = "Rúe del Percebe, 13";
    const postalCode = "12345";
    const onSuccess = jest.fn(); 
    const onErrors = jest.fn();
    const action = actions.buy(shoppingCartId, postalAddress, postalCode, onSuccess, onErrors);
    const expectedActions = [actions.buyCompleted(orderId)];
    const store = mockStore({});

    store.dispatch(action);

    expect(backendBuySpy.mock.calls[0][0]).toEqual(shoppingCartId);
    expect(backendBuySpy.mock.calls[0][1]).toEqual(postalAddress);
    expect(backendBuySpy.mock.calls[0][2]).toEqual(postalCode);
    expect(store.getActions()).toEqual(expectedActions);
    expect(onSuccess).toHaveBeenCalled();
    expect(onErrors).not.toHaveBeenCalled();

});

test('buy - backend errors', () => {

    const backendErrors = {globalError: "Some backend error"};
    
    jest.spyOn(backend.shoppingService, 'buy').mockImplementation(
        (_shoppingCartId, _postalAddress, _postalCode, _onSuccess, onErrors) => 
            onErrors(backendErrors));

    const shoppingCartId = 1;
    const postalAddress = "Rúe del Percebe, 13";
    const postalCode = "12345";
    const onSuccess = jest.fn(); 
    const onErrors = jest.fn();
    const action = actions.buy(shoppingCartId, postalAddress, postalCode, onSuccess, onErrors);
    const expectedActions = [];
    const store = mockStore({});

    store.dispatch(action);

    // Assertions common to the "successful" use case are not repeated here.
    expect(store.getActions()).toEqual(expectedActions);
    expect(onSuccess).not.toHaveBeenCalled();
    expect(onErrors).toHaveBeenCalled();
    expect(onErrors.mock.calls[0][0]).toEqual(backendErrors);

});