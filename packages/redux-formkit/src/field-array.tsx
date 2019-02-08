import * as PropTypes from "prop-types";
import * as React from "react";
import { pushToFieldArray, removeFromFieldArray } from "./actions";
import connectToFormkit from "./connect-to-formkit";
import getField from "./state-utils/get-field";

interface FieldArrayProps {
  formkitForm: any;
  name: string;
  component: any;
  fields: any;
  push: any;
  remove: any;
}

class FieldArray extends React.PureComponent<FieldArrayProps> {

  public static propTypes: any;

  public componentDidMount() {
    this.props.formkitForm.registerFieldArray(this);
  }

  public componentWillUnmount() {
    this.props.formkitForm.deregisterFieldArray(this);
  }

  public render() {
    const fields = {
      map: (callback) => (
        (this.props.fields || []).map((item, index) =>
          callback(`${this.props.name}[${index}]`, index),
        )
      ),
      name: this.props.name,
      push: this.props.push,
      remove: this.props.remove,
    };

    const {component: Component, ...rest} = this.props;
    return <Component {...rest} fields={fields} />;
  }
}

FieldArray.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  fields: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  fields: getField(state.fieldValues, ownProps.name) || [],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  push: () => {dispatch(pushToFieldArray(ownProps.name)); },
  remove: (index) => {dispatch(removeFromFieldArray(ownProps.name, index)); },
});

export default connectToFormkit(mapStateToProps, mapDispatchToProps)(FieldArray);
