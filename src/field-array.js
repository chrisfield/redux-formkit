import React from 'react';
import PropTypes from 'prop-types';
import connectToFormkit from './connect-to-formkit';
import {pushToFieldArray, removeFromFieldArray} from './actions';
import getField from './state-utils/get-field';

class FieldArray extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    console.log('FieldArray old and new props', this.props, nextProps)
  }

  render () {
    console.log('Render Field Array');
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


