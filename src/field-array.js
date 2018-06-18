import React from 'react';
import connectToFormkit from './connect-to-formkit';
import {pushToFieldArray, removeFromFieldArray} from './actions';
import getField from './state-utils/get-field';

class FieldArray extends React.PureComponent {

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

const mapStateToProps = (state, ownProps) => ({
  fields: getField(state.fieldValues, ownProps.name) || []
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  push: () => {dispatch(pushToFieldArray(ownProps.name))},
  remove: index => {dispatch(removeFromFieldArray(ownProps.name, index))}
});

export default connectToFormkit(mapStateToProps, mapDispatchToProps)(FieldArray);


