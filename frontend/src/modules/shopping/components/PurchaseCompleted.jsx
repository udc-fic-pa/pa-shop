import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Alert from 'react-bootstrap/Alert';

import * as selectors from '../selectors';
import OrderLink from './OrderLink';

const PurchaseCompleted = () => {

    const orderId = useSelector(selectors.getLastOrderId);

    if (!orderId) {
        return null;
    }
    
    return (
        <Alert variant="success">
            <FormattedMessage id="project.shopping.PurchaseCompleted.purchaseOrderGenerated"/>:
            &nbsp;
            <OrderLink id={orderId}/>
        </Alert>
    );

}

export default PurchaseCompleted;
