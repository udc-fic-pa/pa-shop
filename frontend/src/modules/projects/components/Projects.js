import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const Projects = ({projects}) => projects && (

    <div className="card border-dark">
        <h5 className="card-header">
            <FormattedMessage id="project.projects.Projects.title"/>
        </h5>
        <div className="card-body">
            <div className="list-group list-group-flush">
                {projects.map((project, index) =>
                    <Link key={index} className="list-group-item list-group-item-action" 
                        to={`/projects/project-details/${project.id}`}>
                        {project.name}
                    </Link>
                )}
            </div>
        </div>
    </div>

);

Projects.propTypes = {
    projects: PropTypes.array
}

export default Projects;
