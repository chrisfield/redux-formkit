import React from "react";
import ReactDOM from "react-dom";
import {FormStateProvider} from "redux-formkit";
import MyForm from './my-form.jsx';

const FormContainer = () => {
  return (
    <FormStateProvider>
      <MyForm/>
    </FormStateProvider>
  );
};

const wrapper = document.getElementById("app");
ReactDOM.render(<FormContainer />, wrapper);

export default FormContainer;