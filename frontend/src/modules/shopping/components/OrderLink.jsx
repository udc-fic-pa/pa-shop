import {Link} from 'react-router-dom';

const OrderLink = ({id}) => {

    return (
        <Link to={`/shopping/order-details/${id}`}>
            {id}
        </Link>
    );

}

export default OrderLink;
