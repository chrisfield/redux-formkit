import * as actions from '../src/actions'
import { actionTypes as types } from '../src/actions'

describe('actions', () => {
  it('should create an action: initFormState', () => {
    const form = 'myTestForm'
    const expectedAction = {
      type: types.INIT_FORM_STATE,
      form,
      formStatus:{},
      fieldStatus:{},
      fieldValues:{},
      fieldErrors:{}
    }
    expect(actions.initFormState(form)).toEqual(expectedAction)
  })

  it('should create an action: updateField', () => {
    const field = 'myTestField'
    const value = 'value1'
    const expectedAction = {
      type: types.UPDATE_FIELD,
      field,
      value
    }
    expect(actions.updateField(field, value)).toEqual(expectedAction)
  })

  it('should create an action: updateFields', () => {
    const payload = {
      field1: 'f1',
      field2: 'f2'
    }
    const expectedAction = {
      type: types.UPDATE_FIELDS,
      payload
    }
    expect(actions.updateFields(payload)).toEqual(expectedAction)
  })

  it('should create an action: setUntouchAllFields', () => {
    const expectedActionForTouchedTrue = {
      type: types.SET_REVALIDATE_FIELDS_DUE,
      payload: {touched: true}
    }
    const expectedActionForTouchedFalse = {
      type: types.SET_REVALIDATE_FIELDS_DUE,
      payload: {touched: false}
    }
    expect(actions.setRevalidateFieldsDue({touched:true})).toEqual(expectedActionForTouchedTrue)
    expect(actions.setRevalidateFieldsDue({touched:false})).toEqual(expectedActionForTouchedFalse)
  })

  it('should create an action: setFieldError', () => {
    const field = 'myTestField'
    const error = 'Required field - please enter a value'
    const value = 'value1'
    const expectedAction = {
      type: types.SET_FIELD_ERROR,
      field,
      error,
      value
    }
    expect(actions.setFieldError(field, error, value)).toEqual(expectedAction)
  })

  it('should create an action: setFieldTouched', () => {
    const field = 'myTestField'
    const expectedActionForTrue = {
      type: types.SET_FIELD_TOUCHED,
      field,
      touched: true
    }
    const expectedActionForFalse = {
      type: types.SET_FIELD_TOUCHED,
      field,
      touched: false
    }
    expect(actions.setFieldTouched(field, true)).toEqual(expectedActionForTrue)
    expect(actions.setFieldTouched(field, false)).toEqual(expectedActionForFalse)
  })

  it('should create an action: pushToFieldArray', () => {
    const fieldArray = 'hobbies'
    const payload = {
      hobbie: 'Hiking'
    }
    const expectedAction = {
      type: types.PUSH_TO_FIELD_ARRAY,
      fieldArray,
      payload
    }
    expect(actions.pushToFieldArray(fieldArray, payload)).toEqual(expectedAction)
  })

  it('should create an action: removeFromFieldArray', () => {
    const fieldArray = 'hobbies'
    const index = 3
    const expectedAction = {
      type: types.REMOVE_FROM_FIELD_ARRAY,
      fieldArray,
      index
    }
    expect(actions.removeFromFieldArray(fieldArray, index)).toEqual(expectedAction)
  })

  it('should create an action: deregisterField', () => {
    const field = 'myField'
    const expectedAction = {
      type: types.DEREGISTER_FIELD,
      field
    }
    expect(actions.deregisterField(field)).toEqual(expectedAction)
  })

  it('should create an action: startSubmit', () => {
    const expectedAction = {
      type: types.START_SUBMIT
    }
    expect(actions.startSubmit()).toEqual(expectedAction)
  })

  it('should create an action: stopSubmit', () => {
    const errors = {
      userName: 'This username is already taken'
    }
    const expectedActionWithErrors = {
      type: types.STOP_SUBMIT,
      errors
    }
    const expectedActionWithoutErrors = {
      type: types.STOP_SUBMIT
    }
    expect(actions.stopSubmit(errors)).toEqual(expectedActionWithErrors)
    expect(actions.stopSubmit()).toEqual(expectedActionWithoutErrors)
  })


})

/*

export const stopSubmit = (errors?) => (
  {type: actionTypes.STOP_SUBMIT, errors}
);

*/