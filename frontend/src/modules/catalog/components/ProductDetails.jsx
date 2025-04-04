import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {useParams} from 'react-router';
import Card from 'react-bootstrap/Card';

import users from '../../users';
import * as selectors from '../selectors';
import backend from '../../../backend';
import {AddToShoppingCart} from '../../shopping';
import {BackLink} from '../../common';

const ProductDetails = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    const [product, setProduct] = useState(null);
    const categories = useSelector(selectors.getCategories);
    const {id} = useParams();
    const productId = Number(id);

    useEffect(() => {

        const findProductById = async productId => {
            if (!Number.isNaN(productId)) {
                const response = await backend.catalogService.findProductById(productId);
                if (response.ok) {
                    setProduct(response.payload);
                }
            }
        }

        findProductById(productId);

    }, [productId]);

    if (!product) {
        return null;
    }
        
    return (

        <>

            <BackLink/>
            
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="text-muted">
                        <FormattedMessage id='project.global.fields.department'/>:&nbsp;
                            {selectors.getCategoryName(categories, product.categoryId)}
                    </Card.Subtitle>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text className="fw-bold">
                        <FormattedMessage id='project.global.fields.price'/>{': '}
                        <FormattedNumber value={product.price} style="currency" currency="EUR"/>
                    </Card.Text>
                </Card.Body>
            </Card>

            {loggedIn && 
                <div>
                    <br/>
                    <AddToShoppingCart productId={product.id}/>
                </div>
            }

        </>

    );

}

export default ProductDetails;
