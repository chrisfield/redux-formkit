import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registerFieldArray, deregisterFieldArray, arrayPush, arrayRemove} from './actions/field';
import getFormState from './selectors/getFormState';
import getFieldValue from './selectors/getFieldValue';

import PropTypes from 'prop-types';

class FieldArray extends Component {

  constructor(props) {
    super(props);
    this.fields = [];
    this.registerField = this.registerField.bind(this);
    this.deregisterField = this.deregisterField.bind(this);      ;
    this.propsForForm = {
      registerField: this.registerField,
      deregisterField: this.deregisterField,
      props: this.props.form.props,
      name: this.props.form.name   
    }
  }

  componentDidMount() {
    this.props.form.registerField(this);
    this.props.register(this.props.name);
  }

  componentWillUnmount() {
    this.props.deregister(this.props.name);
    this.props.form.deregisterField(this);
  }

  registerField(field) {
    this.fields.push(field);
  }

  deregisterField(field) { 
    const index = this.fields.indexOf(field);
    if (index > -1) {
      this.fields.splice(index, 1);
    }
  }

  render() {
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
      return <Component {...this.props} form={this.propsForForm} fields={fields} />
    }
    
    return this.props.children({
      fields: this.props.fields,
      push: this.props.push
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
    push: () => {dispatch(arrayPush(form, ownProps.name, {}))},
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
