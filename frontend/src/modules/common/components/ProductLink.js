import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const ProductLink = ({id, name}) => {
    
    return (
        <Link to={`/catalog/product-details/${id}`}>
            {name}
        </Link>
    );

}

ProductLink.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default ProductLink; 