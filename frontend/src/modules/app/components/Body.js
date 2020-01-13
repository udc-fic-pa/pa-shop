import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import {FindProductsResult, ProductDetails} from '../../catalog';
import {ShoppingCart, Buy, PurchaseCompleted, FindOrders, FindOrdersResult, OrderDetails} from '../../shopping';

const Body = () => {

    const loggedIn = useSelector(users.selectors.isLoggedIn);
    
   return (

        <div className="container">
            <br/>
            <AppGlobalComponents/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/catalog/find-products-result" component={FindProductsResult}/>
                <Route exact path="/catalog/product-details/:id" component={ProductDetails}/>
                {loggedIn && <Route exact path="/shopping/shopping-cart" component={ShoppingCart}/>}
                {loggedIn && <Route exact path="/shopping/buy" component={Buy}/>}
                {loggedIn && <Route exact path="/shopping/purchase-completed" component={PurchaseCompleted}/>}
                {loggedIn && <Route exact path="/shopping/find-orders" component={FindOrders}/>}
                {loggedIn && <Route exact path="/shopping/find-orders-result" component={FindOrdersResult}/>}
                {loggedIn && <Route exact path="/shopping/order-details/:id" component={OrderDetails}/>}
                {loggedIn && <Route exact path="/users/update-profile" component={UpdateProfile}/>}
                {loggedIn && <Route exact path="/users/change-password" component={ChangePassword}/>}
                {loggedIn && <Route exact path="/users/logout" component={Logout}/>}
                {!loggedIn && <Route exact path="/users/login" component={Login}/>}
                {!loggedIn && <Route exact path="/users/signup" component={SignUp}/>}
                <Route component={Home}/>
            </Switch>
        </div>

    );

};

export default Body;
