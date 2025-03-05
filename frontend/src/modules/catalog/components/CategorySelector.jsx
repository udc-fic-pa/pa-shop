import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Form from 'react-bootstrap/Form';

import * as selectors from '../selectors';

const CategorySelector = (selectProps) => {

    const categories = useSelector(selectors.getCategories);
    
    return (

        <Form.Select {...selectProps } className="me-2">

            <FormattedMessage id='project.catalog.CategorySelector.allCategories'>
                {message => (<option value="">{message}</option>)}
            </FormattedMessage>

            {categories && categories.map(category => 
                <option key={category.id} value={category.id}>{category.name}</option>
            )}

        </Form.Select>

    );

}

export default CategorySelector;
