import reducer from '../src/reducers';
import describeInitFormState from './reducers/initFormState';

const tests = {
  InitFormState: describeInitFormState
}

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

  Object.keys(tests).forEach(key => {
    describe(key, tests[key])
  })

})