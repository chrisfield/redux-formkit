import { useForm } from './form';
import useFormReducer from './form-reducer';
import getField from './state-utils/get-field';

const useNamedValidation  = (fieldName: string) => {
  const { name: formName } = useForm();
  const [formState] = useFormReducer(formName);
  const error =  getField(formState.formErrors, fieldName);
  return { error };
};

const ValidationStatus = ({name, children}: any) => {
  const {error} = useNamedValidation(name);
  return children({error})
};

export default ValidationStatus;
