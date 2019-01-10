import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import ShoppingItem from './ShoppingItem';
import {Errors} from '../../common';

const initialState = {
    backendErrors: null
};

class ShoppingItemList extends React.Component {

    constructor(props) {

        super(props);

        this.state = initialState;

    }

    setBackendErrors(backendErrors) {
        this.setState({backendErrors});
    }

    handleErrorsClose() {
        this.setState({backendErrors: null});
    }

    render() {

        const {list, edit,  handleUpdateQuantity, handleRemoveItem} = this.props;

        if (list.items.length === 0) {
            return (
                <div className="alert alert-info" role="alert">
                    <FormattedMessage id='project.shopping.ShoppingCart.empty'/>
                </div>
            );
        }

        return (

            <div>

                <Errors errors={this.state.backendErrors}
                    handleClose={() => this.handleErrorsClose()}/>

                <table className="table">

                    <thead>
                        <tr>
                            <th scope="col" style={{width: '60%'}}></th>
                            <th scope="col" style={{width: '20%'}}>
                                <FormattedMessage id='project.global.fields.price'/>
                            </th>
                            <th scope="col" style={{width: '20%'}}>
                                <FormattedMessage id='project.global.fields.quantity'/>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.items.map((item, index) => 
                            <ShoppingItem shoppingItemListId={list.id} key={index} 
                                item={item} index={index}
                                edit={edit} 
                                handleUpdateQuantity={handleUpdateQuantity}
                                handleRemoveItem={handleRemoveItem}
                                handleBackendErrors={errors => this.setBackendErrors(errors)}/>
                        )}
                    </tbody>

                </table>

                <p className="text-center font-weight-bold">
                    <FormattedMessage id='project.global.fields.totalPrice'/>: {list.totalPrice}€
                </p>

            </div>

        );

    }

}

ShoppingItemList.propTypes = {
    list: PropTypes.object.isRequired,
    edit: PropTypes.bool,
    handleUpdateQuantity: PropTypes.func,
    handleRemoveItem: PropTypes.func
}

export default ShoppingItemList;