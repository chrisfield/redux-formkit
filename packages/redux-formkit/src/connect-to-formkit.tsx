import * as React from "react";
import { PureComponent } from "react";
import FormkitContext from "./formkit-context";

const connectToForm = (mapStateToProps, mapDispatchToProps: any = noop) => {
    return (Field) => {
      class FieldWithDispatchProps extends PureComponent<{formkitForm: any}> {

        public dispatchers: any;

        constructor(props) {
          super(props);
          this.dispatch = this.dispatch.bind(this);
          const dispatchers = mapDispatchToProps(this.dispatch, props);
          Object.keys(dispatchers).forEach((key) => {
            dispatchers[key] = dispatchers[key].bind(this);
          });
          this.dispatchers = dispatchers;
        }

        public dispatch(action) {
          this.props.formkitForm.dispatch(action);
        }

        public render() {
          return (
            <Field {...this.props} {...this.dispatchers}/>
          );
        }
      }

      const renderFieldWithDispatchProps = (props) => (
        ({formkitForm, formInterface, formState}) => {
          const stateProps = mapStateToProps(formState, props);
          return (
            <FieldWithDispatchProps
              formkitForm={formkitForm}
              formInterface={formInterface}
              {...stateProps}
              {...props}
            />
          );
        }
      );

      const FieldWithContext = (props) => (
        <FormkitContext.Consumer>
          {renderFieldWithDispatchProps(props)}
        </FormkitContext.Consumer>
      );

      return FieldWithContext;
    };
  };

const noop = () => ({});

export default connectToForm;
