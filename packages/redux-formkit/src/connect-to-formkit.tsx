import * as React from "react";
import FormkitContext from "./formkit-context";

const connectToForm = (mapStateToProps, mapDispatchToProps: any = noop) => {
  return Field => {
    const FieldWithDispatchProps = props => {
      const dispatch = action  => {
        props.formkitForm.dispatch(action);
      }
      const dispatchers = mapDispatchToProps(dispatch, props);

      return (
        <Field {...props} {...dispatchers}/>
      );
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

    const FieldWithContext = props => (
      <FormkitContext.Consumer>
        {renderFieldWithDispatchProps(props)}
      </FormkitContext.Consumer>
    );

    return FieldWithContext;
  };
};

const noop = () => ({});

export default connectToForm;
