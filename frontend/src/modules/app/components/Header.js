import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {FindProducts} from '../../catalog';
import {ShoppingCartIcon} from '../../shopping';
import users from '../../users';

const Header = ({user}) => (

    <nav className="navbar navbar-expand-lg navbar-light bg-light border">
        <Link className="navbar-brand" to="/">PA Shop</Link>
        <button className="navbar-toggler" type="button" 
            data-toggle="collapse" data-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mr-auto">
                <li>
                    <FindProducts/>
                </li>
            </ul>

            
            {user ? 

            <ul className="navbar-nav">

                <li className="nav-item">
                    <Link className="nav-link" to="/shopping/shopping-cart">
                        <ShoppingCartIcon/>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/shopping/find-orders">
                        <FormattedMessage id="project.shopping.header.orders"/>
                    </Link>
                </li>
                
                <li className="nav-item dropdown">

                    <a className="dropdown-toggle nav-link" 
                        data-toggle="dropdown">
                        <span className="fas fa-user"></span>&nbsp;
                        {user.userName}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link className="dropdown-item" to="/users/update-profile">
                            <FormattedMessage id="project.users.UpdateProfile.title"/>
                        </Link>
                        <Link className="dropdown-item" to="/users/change-password">
                            <FormattedMessage id="project.users.ChangePassword.title"/>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/users/logout">
                            <FormattedMessage id="project.app.Header.logout"/>
                        </Link>
                    </div>

                </li>

            </ul>
            
            :

            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/users/login">
                        <FormattedMessage id="project.users.Login.title"/>
                    </Link>
                </li>
            </ul>
            
            }

        </div>
    </nav>

);

const mapStateToProps = state => ({
    user: users.selectors.getUser(state)
});

export default connect(mapStateToProps)(Header);
