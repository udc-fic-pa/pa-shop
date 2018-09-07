import React from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from 'react-intl';

import {NameEditor} from '../../common';

const Task = ({task, handleCompleted, handleRename, handleRemove, intl}) => (

    <div>

        <button type="button" className="btn btn-link btn-sm" 
            onClick={() => handleCompleted(task.id, !task.completed)}>
            <span className="fas fa-check"></span>
        </button>

        <NameEditor
            id={"tasks-rename-" + task.id}
            name={task.name} 
            title={intl.formatMessage({id: 'project.tasks.Task.NameEditor.title'})}
            handleSave={(newName, onSuccess, onErrors) =>
                handleRename(task.id, newName, onSuccess, onErrors)}/>

        <button type="button" className="btn btn-link btn-sm" 
            onClick={() => handleRemove(task.id)}>
            <span className="fas fa-trash"></span>
        </button>

        {task.completed ? <del>{task.name}</del> : task.name}

    </div>

);

Task.propTypes = {
    task: PropTypes.object.isRequired,
    handleCompleted: PropTypes.func.isRequired,
    handleRename: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired
}

export default injectIntl(Task);
