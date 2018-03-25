import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerFieldArray, deregisterFieldArray, arrayPush, arrayRemove} from './actions/field';
import getFormState from './selectors/getFormState';
import getFieldValue from './selectors/getFieldValue';

import PropTypes from 'prop-types';

class FieldArray extends Component {

  componentDidMount() {
    this.props.register(this.props.name);
  }

  componentWillUnmount() {
    this.props.deregister(this.props.name);
  }


  render() {
    const propsForForm = {
      registerField: this.props.form.registerField,
      deregisterField: this.props.form.deregisterField,
      props: this.props.form.props,
      name: this.props.form.name   
    };

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

    if (this.props.component) {
      const Component = this.props.component;
      return <Component {...this.props} form={propsForForm} fields={fields} />
    }
    
    return this.props.children({
      ...this.props, 
      form: propsForForm,
      fields: fields
    });
  }
}


FieldArray.propTypes = {
  form: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}


const mapStateToProps = (state, ownProps) => {
  const formState = getFormState(state, ownProps.form.name);

  return {
    fields: getFieldValue(formState.values, ownProps.name) || []
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const form = ownProps.form.name;
  return {
    push: () => {dispatch(arrayPush(form, ownProps.name))},
    remove: (index) => { 
      dispatch(arrayRemove(form, ownProps.name, index))
    },
    register: (name) => {dispatch(registerFieldArray(form, name))},
    deregister: (name) => {dispatch(deregisterFieldArray(form, name))}
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FieldArray);
