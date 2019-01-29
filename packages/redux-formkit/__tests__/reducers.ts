import { actionTypes } from '../src/actions';
import reducer from '../src/reducers';

describe('reducers', () => {
  it('should initialize state to {}', () => {
    const state = reducer(undefined, undefined)
    expect(state).toEqual({})
  })

  it('should not modify state when action has no form', () => {
    const state = {foo: 'bar'}
    expect(reducer(state, {type: 'SOMETHING_ELSE'})).toBe(state)
  })

  it('should not modify state when unknow action has form', () => {
    const state = {foo: 'bar'}
    expect(reducer(state, {type: 'SOMETHING_ELSE', form: 'foo'})).toBe(state)
  })

  it('should not modify state when known action has no form', () => {
    const state = {foo: 'bar'}
    expect(reducer(state, {type: actionTypes.INIT_FORM_STATE})).toBe(state)
  })

  it('should initialize form state when known action has form', () => {
    const state = reducer(undefined, {
      type: actionTypes.INIT_FORM_STATE,
      form: 'myForm'
    })
    expect(state).toEqual({
      myForm: {
        formStatus: {
          errorCount: 0,
          isSubmitting: false,
          isValid: true
        },
        fieldStatus: {},
        fieldValues: {},
        fieldErrors: {}          
      }
    })
  })  

})