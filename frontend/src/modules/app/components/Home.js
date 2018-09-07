import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import users from '../../users';

const Home = ({loggedIn}) => {

    if (!loggedIn) {
        return (
            <div className="text-center">
                <FormattedMessage id="project.app.Home.welcome"/>
            </div>
        );
    }

    return (
        <div/>
    );

}

const mapStateToProps = (state, ownProps) => ({
    loggedIn: users.selectors.getUser(state) !== null
});

export default connect(mapStateToProps)(Home);
