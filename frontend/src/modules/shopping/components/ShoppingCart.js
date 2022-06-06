import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router-dom';

import ShoppingItemList from './ShoppingItemList';
import * as selectors from '../selectors';
import * as actions from '../actions';

const ShoppingCart = () => {

    const cart = useSelector(selectors.getShoppingCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (

        <div>
            <ShoppingItemList list={cart} edit
                onUpdateQuantity={(...args) => dispatch(actions.updateShoppingCartItemQuantity(...args))}
                onRemoveItem={(...args) => dispatch(actions.removeShoppingCartItem(...args))}/>
            {cart.items.length > 0 &&
            <div className="text-center">
                <button type="button" className="btn btn-primary"
                    onClick={() => navigate('/shopping/buy')}>
                    <FormattedMessage id="project.global.buttons.buy"/>
                </button>
            </div>
            }
        </div>

    );

}
export default ShoppingCart;
