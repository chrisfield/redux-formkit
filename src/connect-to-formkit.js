import React, {PureComponent} from 'react';
import FormkitContext from './formkit-context';

const connectToForm = (mapStateToProps, mapDispatchToProps = noop) => {
    return Field => {
      class FieldWithEvents extends PureComponent {
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
          this.props.form.dispatch(action);
        }
        
        render() {
          return (
            <Field {...this.props} {...this.dispatchers}/>
          );
        }
      }
  
      const FieldWithContext = React.forwardRef(props => (
        <FormkitContext.Consumer>
          {({formContext, formState}) => {
            const stateProps = mapStateToProps(formState, props);
            return <FieldWithEvents form={formContext} {...stateProps} {...props}/>
          }}
        </FormkitContext.Consumer>
      ));
  
      return FieldWithContext;

    }
  };

  const noop = () => ({});

  export default connectToForm;