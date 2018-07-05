import {connect} from 'react-redux';
import ExampleForm from '../components/ExampleForm';
import FormStateUpdater from '../components/form-state-updater';
import {updateFieldsAction} from 'redux-formkit';

class Index extends React.Component {
  static getInitialProps ({ reduxStore }) {
    const formValues = {
      hobbies: [
        {description: 'Fishing'},
        {description: 'Knitting'},
        {description: ''},
      ],
      field1: 'ssr',
      theNumber: 41,
      isAgreed: true,
      rb2: 'B'
    };


    reduxStore.dispatch(updateFieldsAction('exampleF', formValues));

    return {};

  }

  render(){
    return (
      <div>
        <ExampleForm/>
        <FormStateUpdater/>
      </div>
    );
  }
}

export default connect()(Index);
