import reducer from './reducer';
import * as actions from './actions';

test('BUY_COMPLETED', () => {

    const orderId = 1;
    const shoppingCartId = 1;
    const initialState = {shoppingCart: {id: shoppingCartId}}

    const state = reducer(initialState, actions.buyCompleted(orderId));

    expect(state.lastOrderId).toEqual(orderId);
    expect(state.shoppingCart).toEqual(
        {id: shoppingCartId, items: [], totalPrice: 0, totalQuantity: 0});

});