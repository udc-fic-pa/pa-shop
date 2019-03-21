import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';
import $ from 'jquery';

class ShoppingItem extends React.Component {

    constructor(props) {

        super(props);

        this.quantityFormId = `modify-shopping-item-quantity-form-${props.item.productId}`;

        this.state = {
            quantity: props.item.quantity
        };

    }

    handleQuantityChange(event) {
        this.setState({quantity: Number(event.target.value)});
    }

    handleSubmit(event) {

        event.preventDefault();

        const form = $(`#${this.quantityFormId}`);

        if (form.get(0).checkValidity()) {
            this.handleUpdateQuantity();
        } else {
            this.props.handleBackendErrors(null);
            form.get(0).classList.add('was-validated');
        }
    
    }

    handleRemoveItem() {

        this.props.handleRemoveItem(this.props.shoppingItemListId,
            this.props.item.productId, 
            () => {
                this.props.handleBackendErrors(null);
            }, 
            backendErrors => {
                this.props.handleBackendErrors(backendErrors);
            });

    }

    handleUpdateQuantity() {

        this.props.handleUpdateQuantity(this.props.shoppingItemListId,
            this.props.item.productId, this.state.quantity, 
            () => {
                this.setState({quantity: this.props.item.quantity});
                this.props.handleBackendErrors(null);
            }, 
            backendErrors => {
                this.setState({quantity: this.props.item.quantity});
                this.props.handleBackendErrors(backendErrors);
            });

    }

    render() {

        const {item, edit} = this.props;

        return (
            <tr>                   
                <td>
                    { edit &&
                    <span>
                        <button type="button" className="btn btn-danger btn-sm"
                            onClick={() => this.handleRemoveItem()}>
                            <span className="fas fa-trash-alt"></span>
                        </button>
                        &nbsp;
                        &nbsp;
                    </span>
                    }
                    <Link to={`/catalog/product-details/${item.productId}/withoutBackLink`}>{item.productName}</Link>
                </td>
                <td>{item.productPrice}€</td>
                { edit &&
                <td>
                    <form id={this.quantityFormId} className="form-inline needs-validation" 
                        noValidate onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="number" className="form-control mr-2" style={{width: '50%'}}
                            value={this.state.quantity}
                            onChange={(e) => this.handleQuantityChange(e)}
                            min="1" max="1000"/>
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

}

ShoppingItem.propTypes = {
    shoppingItemListId: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    edit: PropTypes.bool,
    handleUpdateQuantity: PropTypes.func,
    handleRemoveItem: PropTypes.func,
    handleBackendErrors: PropTypes.func
}

export default ShoppingItem;
