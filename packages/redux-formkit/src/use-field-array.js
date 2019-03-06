import { useForm } from './form';
import useFormReducer from './form-reducer';
import getField from './state-utils/get-field';

const useFieldArray = (fieldArrayName) => {
  const { name:formName } = useForm();
  const [formState, formDispatch] = useFormReducer(formName);

  const fields = getField(formState.fieldValues, fieldArrayName);

  const dispatch = (action) => {
    formDispatch({fieldArray: fieldArrayName, ...action });
  };
  return {fields, dispatch};
};

export default useFieldArray;