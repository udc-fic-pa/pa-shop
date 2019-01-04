import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

import AppGlobalComponents from './AppGlobalComponents';
import Home from './Home';
import {Login, SignUp, UpdateProfile, ChangePassword} from '../../users';
import users from '../../users';
import {FindProductsResult, ProductDetails} from '../../catalog';
import {ShoppingCart, Buy, PurchaseCompleted, OrderList, Orders, OrderDetails} from '../../shopping';

const Body = ({user}) => (

    <div className="container">
        <br/>
        <Route path="/" component={AppGlobalComponents}/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/catalog/find-products-result" component={FindProductsResult}/>
            <Route exact path="/catalog/product-details/:id/:withBackLink" component={ProductDetails}/>
            {user && <Route exact path="/shopping/shopping-cart" component={ShoppingCart}/>}
            {user && <Route exact path="/shopping/buy" component={Buy}/>}
            {user && <Route exact path="/shopping/purchase-completed" component={PurchaseCompleted}/>}
            {user && <Route exact path="/shopping/order-list" component={OrderList}/>}
            {user && <Route exact path="/shopping/orders" component={Orders}/>}
            {user && <Route exact path="/shopping/order-details/:id" component={OrderDetails}/>}
            {user && <Route exact path="/users/update-profile" component={UpdateProfile}/>}
            {user && <Route exact path="/users/change-password" component={ChangePassword}/>}
            {!user && <Route exact path="/users/login" component={Login}/>}
            {!user && <Route exact path="/users/signup" component={SignUp}/>}
            <Route path="/" component={Home}/>
        </Switch>
    </div>

);

const mapStateToProps = (state, ownProps) => ({
    user: users.selectors.getUser(state)
});

export default withRouter(connect(mapStateToProps)(Body));
