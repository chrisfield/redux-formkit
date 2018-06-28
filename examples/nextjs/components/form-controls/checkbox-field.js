import {Field} from 'redux-formkit';

const isChecked = target => target.checked;

const Checkbox = props => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>
    <input id={props.name} ref={props.setElementRef} type="checkbox" checked={props.value} onChange={props.handleChange}/>
    <style jsx>{`
      div {
        display: flex;
        align-items: center;
        margin-top: 5px;
        margin-bottom: 5px;
      }
      label {
        display: inline-block;
        width: 150px;
        text-align: right;
        padding-right: 10px;
      }
    `}
    </style>   
  </div>
);

const CheckboxField = props => (
  <Field component={Checkbox} getTargetValue={isChecked} {...props} />
);

export default CheckboxField;