import React from 'react';
import {connect} from 'react-redux';

import Task from './Task';
import * as actions from '../actions';
import * as selectors from '../selectors';

let Tasks = ({tasks, handleCompleted, handleRename, handleRemove}) => (

    <div>
        {tasks ?
            tasks.map(task =>
                <div key={task.id}>
                    <Task task={task}
                        handleCompleted={handleCompleted}
                        handleRename={handleRename}
                        handleRemove={handleRemove}
                    />
                </div>) :
            null
        }
    </div>

);

const mapStateToProps = (state) => ({
    tasks: selectors.getSelectedProjectTasks(state)
});

const mapDispatchToProps = {
    handleCompleted: actions.updateCompletedTask,
    handleRename: actions.rename,
    handleRemove: actions.remove
};

Tasks = connect(mapStateToProps, mapDispatchToProps)(Tasks);

export default Tasks;