import {
    default as reducer,
    INITIAL_STATE,
    loadArticles,
    articlesLoaded,
    loadOne,
    oneLoaded,
    error,
} from './articles'

describe('Redux :: State :: articles', () => {
    it('reduces to initial state by default', () => {
        expect(reducer()).toEqual(INITIAL_STATE)
    })

    it('reduces loadArticles action', () => {
        const s1 = { ...INITIAL_STATE, error: 'an error...' }

        expect(
            reducer(s1, loadArticles())
        ).toEqual({
            ...s1,
            error: null,
            isLoading: true,
        })
    })

    it('reduces articlesLoaded action', () => {
        const s1 = { ...INITIAL_STATE, isLoading: true }
        const mockArticles = [1, 2, 3]
        expect(
            reducer(s1, articlesLoaded(mockArticles))
        ).toEqual({
            ...s1,
            isLoading: false,
            articles: mockArticles
        })
    })

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
