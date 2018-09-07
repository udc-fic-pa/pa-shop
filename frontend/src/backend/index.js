import {init} from './appFetch';
import * as projectService from './projectService';
import * as taskService from './taskService';
import * as userService from './userService';


export {default as NetworkError} from "./NetworkError";

export default {init, projectService, taskService, userService};
