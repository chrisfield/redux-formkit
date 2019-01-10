import * as React from 'react';
import * as PropTypes from 'prop-types';
import connectToFormkit from './connect-to-formkit';
import { pushToFieldArray, removeFromFieldArray } from './actions';
import getField from './state-utils/get-field';

interface FieldArrayProps {
  formkitForm: any,
  name: string,
  component: any,
  fields: any,
  push: any,
  remove: any
}

class FieldArray extends React.PureComponent<FieldArrayProps> {

  static propTypes: any

  componentDidMount() {
    this.props.formkitForm.registerFieldArray(this);
  }

  componentWillUnmount() {
    this.props.formkitForm.deregisterFieldArray(this);
  }  

  render () {
    const fields = {
      map: callback => (
        (this.props.fields || []).map((item, index) =>
          callback(`${this.props.name}[${index}]`, index)
        )
      ),
      name: this.props.name,
      push: this.props.push,
      remove: this.props.remove
    }

    const {component: Component, ...rest} = this.props;
    return <Component {...rest} fields={fields} />
  }
}

FieldArray.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  push: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.element
  ]).isRequired
};

const mapStateToProps = (state, ownProps) => ({
  fields: getField(state.fieldValues, ownProps.name) || []
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  push: () => {dispatch(pushToFieldArray(ownProps.name))},
  remove: index => {dispatch(removeFromFieldArray(ownProps.name, index))}
});

export default connectToFormkit(mapStateToProps, mapDispatchToProps)(FieldArray);


