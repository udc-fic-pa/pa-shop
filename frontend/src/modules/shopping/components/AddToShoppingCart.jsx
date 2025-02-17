import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {useNavigate} from 'react-router';

import {Errors} from '../../common';
import * as actions from '../actions';
import * as selectors from '../selectors';
import backend from '../../../backend';

const AddToShoppingCart = ({productId}) => {

    const shoppingCart = useSelector(selectors.getShoppingCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [backendErrors, setBackendErrors] = useState(null);
    let form;

    const handleSubmit = async event => {

        event.preventDefault();

        if (form.checkValidity()) {

            const response = await backend.shoppingService.addToShoppingCart(shoppingCart.id, 
                productId, quantity);

            if (response.ok) {
                dispatch(actions.shoppingCartUpdated(response.payload));
                navigate('/shopping/shopping-cart');
            } else {
                setBackendErrors(response.payload);
            }

        } else {

            setBackendErrors(null);
            form.classList.add('was-validated');

        }

    }

    return (
        <div>
            <Errors errors={backendErrors} onClose={() => setBackendErrors(null)}/>
            <form ref={node => form = node}
                className="needs-validation" noValidate 
                onSubmit={e => handleSubmit(e)}>
                <div className="form-group row">
                    <label htmlFor="quantity" className="offset-md-5 col-md-1 col-form-label">
                        <FormattedMessage id="project.global.fields.quantity"/>
                    </label>
                    <div className="col-md-2">
                        <input type="number" id="quantity" className="form-control"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                            autoFocus
                            min="1" />
                        <div className="invalid-feedback">
                            <FormattedMessage id='project.global.validator.incorrectQuantity'/>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="offset-md-6 col-md-2">
                        <button type="submit" className="btn btn-primary">
                            <FormattedMessage id="project.shopping.AddToCart.add"/>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

}


export default AddToShoppingCart;
