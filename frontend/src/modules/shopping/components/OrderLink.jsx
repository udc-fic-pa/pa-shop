import {Link} from 'react-router';

const OrderLink = ({id}) => {

    return (
        <Link to={`/shopping/order-details/${id}`}>
            {id}
        </Link>
    );

}

export default OrderLink;
