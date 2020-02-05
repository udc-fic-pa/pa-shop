import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import {createMemoryHistory} from 'history'

import BuyForm from './BuyForm';
import {IntlProvider} from 'react-intl';
import messages from '../../../i18n/messages';
import {Router} from 'react-router-dom';
import * as actions from '../actions';

const renderComponent = (component, initialState={})=> {

    const store = createStore(() => initialState);
    store.dispatch = jest.fn();
    const history = createMemoryHistory();

    return {history, ...render(
        <Provider store={store}>
            <IntlProvider locale="en" messages={messages['en']}>
                <Router history={history}>
                    {component}
                </Router>
            </IntlProvider>
        </Provider>
    )};
}

afterEach(() => actions.buy.mockRestore());

test('buy - success', () => {

    const shoppingCartId = 1;
    const initialState = {shopping: {shoppingCart: {id: shoppingCartId}}};
    const buySpy = jest.spyOn(actions, 'buy').mockImplementation(
        (_shoppingCartId, _postalAddress, _postalCode, onSuccess, _onErrors) => 
            onSuccess());

    const {getByLabelText, getByRole, history} = renderComponent(<BuyForm/>,
        initialState);
    const postalAddressInput = getByLabelText('Postal address');
    const postalCodeInput = getByLabelText('Postal code');
    const buyButton = getByRole('button');
    const postalAddress = "Rúe del Percebe, 13";
    const postalCode = "12345"; 

    fireEvent.change(postalAddressInput, {target: {value: postalAddress}});
    fireEvent.change(postalCodeInput, {target: {value: postalCode}});

    expect(postalAddressInput.value).toEqual(postalAddress);
    expect(postalCodeInput.value).toEqual(postalCode);

    fireEvent.click(buyButton);

    expect(buySpy.mock.calls[0][0]).toEqual(shoppingCartId);
    expect(buySpy.mock.calls[0][1]).toEqual(postalAddress);
    expect(buySpy.mock.calls[0][2]).toEqual(postalCode);
    expect(history.length).toEqual(2);
    expect(history.location.pathname).toEqual('/shopping/purchase-completed');

});

test('buy - backend errors', () => {

    const initialState = {shopping: {shoppingCart: {id: 1}}};
    const backendError = "Some backend error";

    jest.spyOn(actions, 'buy').mockImplementation(
        (_shoppingCartId, _postalAddress, _postalCode, _onSuccess, onErrors) => 
            onErrors({globalError: backendError}));

    const {getByLabelText, getByRole, container, history} = 
        renderComponent(<BuyForm/>, initialState);
    const postalAddressInput = getByLabelText('Postal address');
    const postalCodeInput = getByLabelText('Postal code');
    const buyButton = getByRole('button');
    const postalAddress = "Rúe del Percebe, 13";
    const postalCode = "12345"; 

    fireEvent.change(postalAddressInput, {target: {value: postalAddress}});
    fireEvent.change(postalCodeInput, {target: {value: postalCode}});
    fireEvent.click(buyButton);

    // Assertions common to the "successful" use case are not repeated here.
    expect(container).toHaveTextContent(backendError);
    expect(history.length).toEqual(1);
    expect(history.location.pathname).toEqual('/');

});