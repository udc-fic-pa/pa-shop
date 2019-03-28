import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword, Logout} from '../../users';
import users from '../../users';
import {FindProductsResult, ProductDetails} from '../../catalog';
import {ShoppingCart, Buy, PurchaseCompleted, FindOrders, OrderDetails} from '../../shopping';

const Body = ({loggedIn}) => (

    <div className="container">
        <br/>
        <Route path="/" component={AppGlobalComponents}/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/catalog/find-products-result" component={FindProductsResult}/>
            <Route exact path="/catalog/product-details/:id/:withBackLink" component={ProductDetails}/>
            {loggedIn && <Route exact path="/shopping/shopping-cart" component={ShoppingCart}/>}
            {loggedIn && <Route exact path="/shopping/buy" component={Buy}/>}
            {loggedIn && <Route exact path="/shopping/purchase-completed" component={PurchaseCompleted}/>}
            {loggedIn && <Route exact path="/shopping/find-orders" component={FindOrders}/>}
            {loggedIn && <Route exact path="/shopping/order-details/:id/:withBackLink" component={OrderDetails}/>}
            {loggedIn && <Route exact path="/users/update-profile" component={UpdateProfile}/>}
            {loggedIn && <Route exact path="/users/change-password" component={ChangePassword}/>}
            {loggedIn && <Route exact path="/users/logout" component={Logout}/>}
            {!loggedIn && <Route exact path="/users/login" component={Login}/>}
            {!loggedIn && <Route exact path="/users/signup" component={SignUp}/>}
            <Route component={Home}/>
        </Switch>
    </div>

);

const mapStateToProps = state => ({
    loggedIn: users.selectors.isLoggedIn(state)
});

/*
 * It is necessary to call withRouter(connect(...)(FindProducts)), since Body
 * must be re-rendered when 'location' changes (among others, withRouter pass
 * 'location' property to the wrapped component).
 */
export default withRouter(connect(mapStateToProps)(Body));
