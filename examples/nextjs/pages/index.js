import withRedux from '../utils/withRedux';
import ExampleForm from '../components/ExampleForm';
import { initStore } from '../store';
import {updateFieldsAction} from 'redux-formkit';
import rootReducer from '../reducers';

const Index = () => (
  <div>
    <ExampleForm/>
  </div>
);


const initialValues = {
  hobbies: [
    {description: 'SSR stamp collecting'}
  ],
  field1: 'ssr',
  theNumber: 41,
  isAgreed: true,
  rb2: 'B'
};

const formActionToSubmit = updateFieldsAction('exampleF', initialValues);

const initStoreWithFormData = (initState={}) => (
  initStore(rootReducer(initState, formActionToSubmit))
);


export default withRedux(initStoreWithFormData, null)(Index);
//export default withRedux(initStore, null)(Index);
