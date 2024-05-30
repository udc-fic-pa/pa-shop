import {FormattedMessage} from 'react-intl';

import * as selectors from '../selectors';
import {ProductLink} from '../../common';

const Products = ({products, categories}) => (

    <table className="table table-striped table-hover">

        <thead>
            <tr>
                <th scope="col">
                    <FormattedMessage id='project.global.fields.department'/>
                </th>
                <th scope="col">
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

    </table>

);

export default Products;
