import React from 'react';
import {Link} from 'react-router-dom';

const OrderLink = ({id, withBackLink=false}) => {

    const withBackLinkPath = withBackLink ? 'withBackLink' : 'withoutBackLink';
    
    return (
        <Link to={`/shopping/order-details/${id}/${withBackLinkPath}`}>
            {id}
        </Link>
    );

}

export default OrderLink;