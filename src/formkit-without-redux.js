import {connect} from './formkit-state';
import buildFormkit from './build-formkit';

const ReduxFormkit = buildFormkit(connect);

export default ReduxFormkit;
