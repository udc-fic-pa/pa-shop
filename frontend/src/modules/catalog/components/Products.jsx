import {FormattedMessage} from 'react-intl';
import Table from 'react-bootstrap/Table';

import * as selectors from '../selectors';
import {ProductLink} from '../../common';

const Products = ({products, categories}) => (

    <Table striped hover>

        <thead>
            <tr>
                <th>
                    <FormattedMessage id='project.global.fields.department'/>
                </th>
                <th>
                    <FormattedMessage id='project.global.fields.name'/>
                </th>
            </tr>
        </thead>

        <tbody>
            {products.map(product => 
                <tr key={product.id}>
                    <td>{selectors.getCategoryName(categories, product.categoryId)}</td>
                    <td><ProductLink id={product.id} name={product.name}/></td>
                </tr>
            )}
        </tbody>

    </Table>

);

export default Products;
