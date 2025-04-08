import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router';
import Button from 'react-bootstrap/Button';

import ShoppingItemList from './ShoppingItemList';
import * as selectors from '../selectors';
import * as actions from '../actions';
import backend from '../../../backend';

const ShoppingCart = () => {

    const cart = useSelector(selectors.getShoppingCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onUpdateQuantity = async (shoppingCartId, productId, quantity, onSuccess, onErrors) => {

        const response = await backend.shoppingService.updateShoppingCartItemQuantity(
            shoppingCartId, productId, quantity);
    
        if (response.ok) {
            dispatch(actions.shoppingCartUpdated(response.payload));
            onSuccess();
        } else {
            onErrors(response.payload);
        }

    }

    const onRemoveItem = async (shoppingCartId, productId, onSuccess, onErrors) => {

        const response = await backend.shoppingService.removeShoppingCartItem(
            shoppingCartId, productId);
    
        if (response.ok) {
            dispatch(actions.shoppingCartUpdated(response.payload));
            onSuccess();
        } else {
            onErrors(response.payload);
        }

    }

    return (

        <div>
            <ShoppingItemList list={cart} edit
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}/>
            {cart.items.length > 0 &&
            <div className="text-center">
                <Button type="button"
                    onClick={() => navigate('/shopping/buy')}>
                    <FormattedMessage id="project.global.buttons.buy"/>
                </Button>
            </div>
            }
        </div>

    );

}
export default ShoppingCart;
