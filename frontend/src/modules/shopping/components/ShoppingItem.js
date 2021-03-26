import {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, FormattedNumber} from 'react-intl';

import {ProductLink} from '../../common';

const ShoppingItem = ({shoppingItemListId, item, edit, onUpdateQuantity, 
    onRemoveItem, onBackendErrors}) => {

    const [quantity, setQuantity] = useState(item.quantity);
    let form;

    const handleSubmit = event => {

        event.preventDefault();

        if (form.checkValidity()) {
            
            onUpdateQuantity(shoppingItemListId,
                item.productId, quantity, 
                () => onBackendErrors(null), 
                backendErrors => {
                    setQuantity(item.quantity);
                    onBackendErrors(backendErrors);
                });

        } else {

            onBackendErrors(null);
            form.classList.add('was-validated');

        }
    
    }

    const handleRemoveItem = () => {

        onRemoveItem(shoppingItemListId,
            item.productId, 
            () => onBackendErrors(null), 
            backendErrors => onBackendErrors(backendErrors));

    }

    return (
        <tr>                   
            <td>
                { edit &&
                <span>
                    <button type="button" className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveItem()}>
                        <span className="fas fa-trash-alt"></span>
                    </button>
                    &nbsp;
                    &nbsp;
                </span>
                }
                <ProductLink id={item.productId} name={item.productName}/>
            </td>
            <td><FormattedNumber value={item.productPrice}/>€</td>
            { edit &&
            <td>
                <form ref={node => form = node} 
                    className="form-inline needs-validation" 
                    noValidate onSubmit={e => handleSubmit(e)}>
                    <input type="number" className="form-control mr-2" style={{width: '50%'}}
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        min="1"/>
                    <button type="submit" className="btn btn-primary">
                        <FormattedMessage id="project.global.buttons.save"/>
                    </button>
                    <div className="invalid-feedback">
                        <FormattedMessage id='project.global.validator.incorrectQuantity'/>
                    </div>
                </form>
            </td>
            }
            {!edit && <td>{item.quantity}</td>}
        </tr>
    );

}

ShoppingItem.propTypes = {
    shoppingItemListId: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    edit: PropTypes.bool,
    onUpdateQuantity: PropTypes.func,
    onRemoveItem: PropTypes.func,
    onBackendErrors: PropTypes.func
}

export default ShoppingItem;
