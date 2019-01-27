import {Field} from 'redux-formkit';

const Input = props => (
    <div className="wrapper">
      <label htmlFor={props.name}>{props.label}</label>
      <span className="inputSpan">
        <input
          name={props.name}
          ref={props.setElementRef}
          id={props.name} 
          type={props.type? props.type: 'text'} 
          placeholder={props.placeholder} 
          value={props.value} 
          onChange={props.handleChange} 
          onBlur={props.handleBlur}
        />
        {props.children && <span className="inputChildren">{props.children}</span>}

      </span>
      {props.error && props.touched &&
        <div className="error">
          {props.error}
        </div>
      }
      <style jsx>{`
        .wrapper {
          margin-top: 5px;
          margin-bottom: 5px;
        }
        label {
          width: 100%;
        }
        .inputSpan {
          display: flex;
          width: 100%;
        }
        input {
          flex: 1;
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
  
  const InputField = props => (
    <Field component={Input} {...props} />
  );

  export default InputField;