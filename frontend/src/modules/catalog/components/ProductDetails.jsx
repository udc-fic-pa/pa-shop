import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {useParams} from 'react-router-dom';

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

        <div>

            <BackLink/>
            
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle text-muted">
                        <FormattedMessage id='project.global.fields.department'/>:&nbsp;
                            {selectors.getCategoryName(categories, product.categoryId)}
                    </h6>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text font-weight-bold">
                        <FormattedMessage id='project.global.fields.price'/>{': '}
                        <FormattedNumber value={product.price} style="currency" currency="EUR"/>
                    </p>
                </div>
            </div>

            {loggedIn && 
                <div>
                    <br/>
                    <AddToShoppingCart productId={product.id}/>
                </div>
            }

        </div>

    );

}

export default ProductDetails;
