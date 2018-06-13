import { connect } from 'react-redux';
import buildFormkit from './build-formkit';

const ReduxFormkit = buildFormkit(connect);

export default ReduxFormkit;
