import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import $ from 'jquery';

class ShoppingItem extends React.Component {

    constructor(props) {

        super(props);

        this.quantityFormId = `modify-shopping-item-quantity-form-${props.index}`;

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
            alert('Not implemented :-(');
        } else {
            form.get(0).classList.add('was-validated');
        }
    
    }

    render() {

        const {item, index, edit} = this.props;

        return (
            <tr key={index}>                     
                <td>
                    { edit &&
                    <span>
                        <button type="button" className="btn btn-danger btn-sm"
                            onClick={() => alert('Not implemented :-(')}>
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
                        <input type="number" className="form-control w-25 mb-2 mr-2" 
                            value={this.state.quantity}
                            onChange={(e) => this.handleQuantityChange(e)}
                            min="1"/>
                        <button type="submit" className="btn btn-primary mb-2">
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
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    edit: PropTypes.bool
}

export default injectIntl(ShoppingItem);
