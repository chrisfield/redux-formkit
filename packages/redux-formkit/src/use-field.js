import { useForm } from './form';
import useFormReducer from './form-reducer';
import getField from './state-utils/get-field';


const defaultCustomProps = {};
const defaultStatus = {customProps: defaultCustomProps};
const useField = (fieldName) => {
  const { name: formName } = useForm();
  const [formState, formDispatch] = useFormReducer(formName);

  const value = getField(formState.fieldValues, fieldName);
  const status = getField(formState.fieldStatus, fieldName) || defaultStatus;
  const touched = status.touched;
  const customProps = status.customProps || defaultCustomProps;
  const error = status.error ? status.error : getField(formState.formErrors, fieldName);

  const dispatch = (action) => {
    formDispatch({field: fieldName, ...action });
  };
  return {value, touched, error, dispatch, formState, customProps};
};

export default useField;