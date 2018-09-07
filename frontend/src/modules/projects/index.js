import * as actions from './actions';
import reducer from './reducer'
import * as selectors from './selectors';

export {default as AddProject} from "./components/AddProject";
export {default as Project} from "./components/Project";
export {default as ProjectDetails} from "./components/ProjectDetails";
export {default as Projects} from "./components/Projects";

export default {actions, reducer, selectors};