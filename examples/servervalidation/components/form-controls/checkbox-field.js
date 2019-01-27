import {Field} from 'redux-formkit';

const isChecked = target => target.checked;

const Checkbox = props => (
  <div className="wrapper">
    <span className="inputWrapper">
      <input
        name={props.name}
        id={props.name}
        ref={props.setElementRef}
        type="checkbox"
        checked={props.value}
        onChange={props.handleChange}
      />
    </span>
    <label htmlFor={props.name}>{props.label}</label>
    <style jsx>{`
      .wrapper {
        margin-top: 5px;
        margin-bottom: 5px;
        display: flex;
        justify-content: left;
      }
      .error {
        display : flex;
        justify-content: flex-end;
        width: 100%;
      }
    `}
    </style>   
  </div>
);

const CheckboxField = props => (
  <Field component={Checkbox} getTargetValue={isChecked} {...props} />
);

export default CheckboxField;