import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const OrderLink = ({id}) => {

    return (
        <Link to={`/shopping/order-details/${id}`}>
            {id}
        </Link>
    );

}

OrderLink.propTypes = {
    id: PropTypes.number.isRequired
};

export default OrderLink;
