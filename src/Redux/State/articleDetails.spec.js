import {
  default as reducer,
  INITIAL_STATE,
  loadOne,
  oneLoaded,
  error,
} from './articleDetails'

describe('Redux :: State :: articles', () => {
  it('reduces loadOne action', () => {
    const s1 = { ...INITIAL_STATE, error: 'an error...' }

    expect(
      reducer(s1, loadOne())
    ).toEqual({
      ...s1,
      error: null,
      isLoading: true,
    })
  })

  it('reduces oneLoaded action', () => {
    const s1 = { ...INITIAL_STATE, isLoading: true }
    const mockArticle = { id: 1, title: 'an article' }

    expect(
      reducer(s1, oneLoaded(mockArticle))
    ).toEqual({
      ...s1,
      isLoading: false,
      article: mockArticle,
    })
  })

  it('reduces error action', () => {
    const s1 = { ...INITIAL_STATE, isLoading: true }

    expect(
      reducer(s1, error('an error message'))
    ).toEqual({
      ...s1,
      error: 'an error message',
      isLoading: false,
    })
  })
})
