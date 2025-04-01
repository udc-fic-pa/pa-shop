import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import Table from 'react-bootstrap/Table';

import OrderLink from './OrderLink';

const Orders = ({orders}) => (

    <Table striped hover>

        <thead>
            <tr>
                <th>
                    <FormattedMessage id='project.global.fields.purchaseOrder'/>
                </th>
                <th>
                    <FormattedMessage id='project.global.fields.date'/>
                </th>
            </tr>
        </thead>

        <tbody>
            {orders.map(order => 
                <tr key={order.id}>
                    <td><OrderLink id={order.id}/></td>
                    <td>
                        <FormattedDate value={new Date(order.date)}/> - <FormattedTime value={new Date(order.date)}/>
                    </td>
                </tr>
            )}
        </tbody>

    </Table>

);

export default Orders;

