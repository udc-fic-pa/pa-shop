import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const ProductLink = ({id, name, withBackLink=false}) => {

    const withBackLinkPath = withBackLink ? 'withBackLink' : 'withoutBackLink';
    
    return (
        <Link to={`/catalog/product-details/${id}/${withBackLinkPath}`}>
            {name}
        </Link>
    );

}

ProductLink.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    withBackLink: PropTypes.bool
};

export default ProductLink; 