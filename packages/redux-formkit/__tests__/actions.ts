import * as actions from '../src/actions'
import { actionTypes as types } from '../src/actions'

describe('actions', () => {
  it('should create an action to initFormState', () => {
    const form = 'myTestForm'
    const expectedAction = {
      type: types.INIT_FORM_STATE,
      form
    }
    expect(actions.initFormState(form)).toEqual(expectedAction)
  })
})