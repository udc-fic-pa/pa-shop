import {combineReducers} from 'redux';

import app from '../modules/app';
import projects from '../modules/projects';
import tasks from '../modules/tasks';
import users from '../modules/users';

const rootReducer = combineReducers({
    app: app.reducer,
    projects: projects.reducer,
    tasks: tasks.reducer,
    users: users.reducer
});

export default rootReducer;



