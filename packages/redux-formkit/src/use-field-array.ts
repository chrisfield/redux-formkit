import { useForm } from './form';
import useFormReducer from './form-reducer';
import getField from './state-utils/get-field';

const useFieldArray = (fieldArrayName: string) => {
  const { name:formName } = useForm();
  const [formState, formDispatch] = useFormReducer(formName);

  const fields = getField(formState.fieldValues, fieldArrayName);

  const dispatch = (action: any) => {
    formDispatch({fieldArray: fieldArrayName, ...action });
  };
  return {fields, dispatch};
};

export default useFieldArray;