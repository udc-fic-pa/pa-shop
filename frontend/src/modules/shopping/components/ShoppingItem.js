import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, FormattedNumber} from 'react-intl';

import {ProductLink} from '../../common';

class ShoppingItem extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            quantity: props.item.quantity
        };

    }

    handleQuantityChange(event) {
        this.setState({quantity: Number(event.target.value)});
    }

    handleSubmit(event) {

        event.preventDefault();

        if (this.form.checkValidity()) {
            this.handleUpdateQuantity();
        } else {
            this.props.onBackendErrors(null);
            this.form.classList.add('was-validated');
        }
    
    }

    handleRemoveItem() {

        this.props.onRemoveItem(this.props.shoppingItemListId,
            this.props.item.productId, 
            () => {
                this.props.onBackendErrors(null);
            }, 
            backendErrors => {
                this.props.onBackendErrors(backendErrors);
            });

    }

    handleUpdateQuantity() {

        this.props.onUpdateQuantity(this.props.shoppingItemListId,
            this.props.item.productId, this.state.quantity, 
            () => {
                this.setState({quantity: this.props.item.quantity});
                this.props.onBackendErrors(null);
            }, 
            backendErrors => {
                this.setState({quantity: this.props.item.quantity});
                this.props.onBackendErrors(backendErrors);
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
                    <ProductLink id={item.productId} name={item.productName}/>
                </td>
                <td><FormattedNumber value={item.productPrice}/>€</td>
                { edit &&
                <td>
                    <form ref={node => this.form = node} 
                        className="form-inline needs-validation" 
                        noValidate onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="number" className="form-control mr-2" style={{width: '50%'}}
                            value={this.state.quantity}
                            onChange={(e) => this.handleQuantityChange(e)}
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
