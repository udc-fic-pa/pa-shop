import {useState} from 'react';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import ShoppingItem from './ShoppingItem';
import {Errors} from '../../common';

const ShoppingItemList = ({list, edit, onUpdateQuantity, onRemoveItem}) => {

    const [backendErrors, setBackendErrors] = useState(null);

    if (list.items.length === 0) {
        return (
            <Alert variant="info">
                <FormattedMessage id='project.shopping.ShoppingCart.empty'/>
            </Alert>
        );
    }

    return (

        <div>

            <Errors errors={backendErrors}
                onClose={() => setBackendErrors(null)}/>

            <Table>

                <thead>
                    <tr>
                        <th style={{width: '60%'}}></th>
                        <th style={{width: '20%'}}>
                            <FormattedMessage id='project.global.fields.price'/>
                        </th>
                        <th style={{width: '20%'}}>
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

            </Table>

            <p className="text-center fw-bold">
                <FormattedMessage id='project.global.fields.totalPrice'/>{': '}
                <FormattedNumber value={list.totalPrice} style="currency" currency="EUR"/>
            </p>

        </div>

    );

}

export default ShoppingItemList;
