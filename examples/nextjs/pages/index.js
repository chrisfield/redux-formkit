import withRedux from '../utils/withRedux';
import ExampleForm from '../components/ExampleForm';
import { initStore } from '../store';

const Index = () => (
  <ExampleForm/>
);

export default withRedux(initStore, null)(Index);

