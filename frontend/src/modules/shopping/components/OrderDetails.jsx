import {useState, useEffect} from 'react';
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import {useParams} from 'react-router-dom';

import backend from '../../../backend';
import ShoppingItemList from './ShoppingItemList';
import {BackLink} from '../../common';

const OrderDetails = () => {

    const {id} = useParams();
    const orderId = Number(id);
    const [order, setOrder] = useState(null);

    useEffect(() => {

        const findOrder = async orderId => {
            if (!Number.isNaN(orderId)) {
                const response = await backend.shoppingService.findOrder(orderId);
                if (response.ok) {
                    setOrder(response.payload);
                }
            }
        }

        findOrder(orderId);

    }, [orderId]);

    if (!order) {
        return null;
    }

    return (

        <div>

            <BackLink/>

            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">
                        <FormattedMessage id='project.global.fields.purchaseOrder'/> {order.id} 
                    </h5>
                    <h6 className="card-subtitle text-muted">
                        <FormattedDate value={new Date(order.date)}/> - <FormattedTime value={new Date(order.date)}/>
                    </h6>
                    <p className="card-text">
                        {order.postalAddress} - {order.postalCode} 
                    </p>
                </div>
            </div>

            <ShoppingItemList list={order}/>

        </div>

    );

}

export default OrderDetails;
