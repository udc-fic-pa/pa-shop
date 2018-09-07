import React from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import projects, {Projects} from '../../projects';
import users from '../../users';

const Home = ({loggedIn, projects}) => {

    if (!loggedIn) {
        return (
            <div className="text-center">
                <FormattedMessage id="project.app.Home.welcome"/>
            </div>
        );
    }

    return (
        <div>
            <Projects projects={projects}/>
        </div>
    );

}

const mapStateToProps = (state, ownProps) => ({
    projects: projects.selectors.getProjects(state),
    loggedIn: users.selectors.getUser(state) !== null
});

export default connect(mapStateToProps)(Home);
