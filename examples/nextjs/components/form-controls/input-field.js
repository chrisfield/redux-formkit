import {Field} from 'redux-formkit';

const Input = props => (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
         ref={props.setElementRef}
         id={props.name} 
         type={props.type? props.type: 'text'} 
         placeholder={props.placeholder} 
         value={props.value} 
         onChange={props.handleChange} 
         onBlur={props.handleBlur}
      />
      {props.children}
      {props.error && props.touched && <p className="error">{props.error}</p>}
      <style jsx>{`
        div {
          margin-top: 5px;
          margin-bottom: 5px;
        }
        label {
          display: inline-block;
          width: 150px;
          text-align: right;
          padding-right: 10px;
        }
        .error {
          margin-left: 160px;
        }
      `}
      </style>     
    </div>
  );
  
  const InputField = props => (
    <Field component={Input} {...props} />
  );

  export default InputField;