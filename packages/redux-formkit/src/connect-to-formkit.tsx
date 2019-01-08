import * as React from 'react';
import { PureComponent } from 'react';
import FormkitContext from './formkit-context';

const connectToForm = (mapStateToProps, mapDispatchToProps = noop) => {
    return Field => {
      class FieldWithDispatchProps extends PureComponent {
        constructor(props) {
          super(props);
          this.dispatch = this.dispatch.bind(this);
          const dispatchers = mapDispatchToProps(this.dispatch, props);
          Object.keys(dispatchers).forEach(key => {
            dispatchers[key] = dispatchers[key].bind(this);
          });
          this.dispatchers = dispatchers;
        }
  
        dispatch(action) {
          this.props.formkitForm.dispatch(action);
        }
        
        render() {
          return (
            <Field {...this.props} {...this.dispatchers}/>
          );
        }
      }

      const FieldWithContext = (props) => (
        <FormkitContext.Consumer>
          {({formkitForm, formInterface, formState}) => {
            const stateProps = mapStateToProps(formState, props);
            return <FieldWithDispatchProps formkitForm={formkitForm} formInterface={formInterface} {...stateProps} {...props}/>
          }}
        </FormkitContext.Consumer>
      );

      return FieldWithContext;
    }
  };

  const noop = () => ({});

  export default connectToForm;