import * as Utils from './Utils'

describe('Utils :: Redux', () => {
  // mock initial state
  const INITIAL_STATE = {
    isFetching: false,
    collection: [],
  }

  // mock action types
  const FETCH = '@test/FETCH'
  const RECEIVED = '@test/RECEIVED'

  // test reducer
  const reducer = Utils.createReducer(INITIAL_STATE, {
    [FETCH]: state => ({
      ...state,
      isFetching: true,
    }),
    [RECEIVED]: (state, action) => ({
      ...state,
      collection: action.collection,
      isFetching: false,
    })
  })

  it('reduces to initial state by default', () => {
    expect(reducer()).toEqual(INITIAL_STATE)
  })

  it('reduces a simple action without parameters', () => {
    expect(
      reducer(INITIAL_STATE, { type: FETCH })
    ).toEqual({
      ...INITIAL_STATE,
      isFetching: true,
    })
  })

  it('reduces ana ction with aprameters', () => {
    const s1 = reducer(INITIAL_STATE, { type: FETCH })
    const s2 = reducer(s1, { type: RECEIVED, collection: [1, 2, 3]})

    expect(s2).toEqual({
      ...s1,
      isFetching: false,
      collection: [1, 2, 3],
    })
  })
})

describe('Utils :: Date', () => {
  it('format an ISO date to an english readable date', () => {
    expect(
      Utils.toEnglishDate('2020-03-08T00:00:00+00:00')
    ).toBe(
      'Sunday, March 8, 2020'
    )
  })
})
