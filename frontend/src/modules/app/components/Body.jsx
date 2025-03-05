import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router';
import Container from 'react-bootstrap/Container';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import {FindProductsResult, ProductDetails} from '../../catalog';
import {ShoppingCart, Buy, PurchaseCompleted, FindOrders, FindOrdersResult, OrderDetails} from '../../shopping';

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
    return (

        <Container className="my-4 justify-content-center flex-grow-1">
            <AppGlobalComponents/>
            <Routes>
                <Route path="/*" element={<Home/>}/>
                <Route path="/catalog/find-products-result" element={<FindProductsResult/>}/>
                <Route path="/catalog/product-details/:id" element={<ProductDetails/>}/>
                {loggedIn && <Route path="/shopping/shopping-cart" element={<ShoppingCart/>}/>}
                {loggedIn && <Route path="/shopping/buy" element={<Buy/>}/>}
                {loggedIn && <Route path="/shopping/purchase-completed" element={<PurchaseCompleted/>}/>}
                {loggedIn && <Route path="/shopping/find-orders" element={<FindOrders/>}/>}
                {loggedIn && <Route path="/shopping/find-orders-result" element={<FindOrdersResult/>}/>}
                {loggedIn && <Route path="/shopping/order-details/:id" element={<OrderDetails/>}/>}
                {loggedIn && <Route path="/users/update-profile" element={<UpdateProfile/>}/>}
                {loggedIn && <Route path="/users/change-password" element={<ChangePassword/>}/>}
                {loggedIn && <Route path="/users/logout" element={<Logout/>}/>}
                {!loggedIn && <Route path="/users/login" element={<Login/>}/>}
                {!loggedIn && <Route path="/users/signup" element={<SignUp/>}/>}
            </Routes>
        </Container>

    );

};

export default Body;
