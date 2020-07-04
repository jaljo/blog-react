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

  it('reduces an action with parameters', () => {
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

describe('Utils :: String', () => {
  it('extracts a gist id from  a full gist url', () => {
    expect(
      Utils.extractGistIdFromUrl('https://gist.github.com/jaljo/6a79a307887da60a99e860711f907b0b.js')
    ).toBe(
      '6a79a307887da60a99e860711f907b0b'
    )
  })

  it('determines if a text is empty', () => {
    expect(Utils.isNotWhiteCharacter('\n')).toBeFalsy()
    expect(Utils.isNotWhiteCharacter('a')).toBeTruthy()
  })
})
