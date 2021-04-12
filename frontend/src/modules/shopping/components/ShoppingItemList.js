import {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage, FormattedNumber} from 'react-intl';

import ShoppingItem from './ShoppingItem';
import {Errors} from '../../common';

const ShoppingItemList = ({list, edit, onUpdateQuantity, onRemoveItem}) => {

    const [backendErrors, setBackendErrors] = useState(null);

    if (list.items.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <FormattedMessage id='project.shopping.ShoppingCart.empty'/>
            </div>
        );
    }

    return (

        <div>

            <Errors errors={backendErrors}
                onClose={() => setBackendErrors(null)}/>

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
                    {list.items.map(item => 
                        <ShoppingItem shoppingItemListId={list.id}
                            key={item.productId} item={item}
                            edit={edit} 
                            onUpdateQuantity={onUpdateQuantity}
                            onRemoveItem={onRemoveItem}
                            onBackendErrors={errors => setBackendErrors(errors)}/>
                    )}
                </tbody>

            </table>

            <p className="text-center font-weight-bold">
                <FormattedMessage id='project.global.fields.totalPrice'/>{': '}
                {/* eslint-disable-next-line */}
                <FormattedNumber value={list.totalPrice} style="currency" currency="EUR"/>
            </p>

        </div>

    );

}

ShoppingItemList.propTypes = {
    list: PropTypes.object.isRequired,
    edit: PropTypes.bool,
    onUpdateQuantity: PropTypes.func,
    onRemoveItem: PropTypes.func
}

export default ShoppingItemList;
