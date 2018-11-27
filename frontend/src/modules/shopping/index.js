import * as actions from './actions';
import reducer from './reducer';
import * as selectors from './selectors';

export {default as AddToShoppingCart} from './components/AddToShoppingCart';
export {default as ShoppingCartIcon} from './components/ShoppingCartIcon';

export default {actions, reducer, selectors};