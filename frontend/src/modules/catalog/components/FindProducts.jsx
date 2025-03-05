import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {FormattedMessage} from 'react-intl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import CategorySelector from './CategorySelector';
import * as actions from '../actions';
import backend from '../../../backend';

const FindProducts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [categoryId, setCategoryId] = useState('');
    const [keywords, setKeywords] = useState('');

    const toNumber = value => value.length > 0 ? Number(value) : null;

    const handleSubmit = async event => {

        event.preventDefault();
        dispatch(actions.clearProductSearch());
        navigate('/catalog/find-products-result');

        const criteria = {categoryId: toNumber(categoryId), 
            keywords: keywords.trim(), page: 0};
        const response = await backend.catalogService.findProducts(criteria);

        if (response.ok) {
            dispatch(actions.findProductsCompleted({criteria, result: response.payload}));
        }

    }

    return (



        <Form onSubmit={e => handleSubmit(e)} className="d-flex">
            <CategorySelector id="categoryId"
                value={categoryId} onChange={e => setCategoryId(e.target.value)}/>

            <Form.Control id="keywords" type="text" className="me-2"
                value={keywords} onChange={e => setKeywords(e.target.value)}/>

            <Button variant="primary" type="submit">
                <FormattedMessage id='project.global.buttons.search'/>
            </Button>
        </Form>

    );

}

export default FindProducts;
