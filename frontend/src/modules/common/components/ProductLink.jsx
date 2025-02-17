import {Link} from 'react-router';

const ProductLink = ({id, name}) => {
    
    return (
        <Link to={`/catalog/product-details/${id}`}>
            {name}
        </Link>
    );

}

export default ProductLink; 
