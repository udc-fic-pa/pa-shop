import * as actions from './actions';
import reducer from './reducer'
import * as selectors from './selectors';

export {default as AddTask} from "./components/AddTask";
export {default as Task} from "./components/Task";
export {default as Tasks} from "./components/Tasks";

export default {actions, reducer, selectors};