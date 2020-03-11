import * as epic from './articles'
import * as articles from './../Redux/State/articles'
import { ActionsObservable } from 'redux-observable'
import { Promise } from 'q';

describe('Epics :: articles :: loadArticlesEpic', () => {
    it('dispatches ARTICLES_LOADED action on fetch succeed', done => {
        const action$ = ActionsObservable.of(articles.loadArticles())
        const articlesMock = [1,2,3]
        const deps = {
            fetchApi: () => Promise.resolve(articlesMock)
        }

        epic.loadArticlesEpic(action$, null, deps)
            .toPromise(Promise)
            .then(action => {
                expect(action.type).toBe(articles.ARTICLES_LOADED)
                expect(action.articles).toEqual(articlesMock)
                done()
            })
            .catch(error => {fail(error); done()})
    }, 1000)

    it('dispatches ERROR action on fetch failure', done => {
        const action$ = ActionsObservable.of(articles.loadArticles())
        const deps = {
            fetchApi: () => Promise.reject('Noop')
        }

        epic.loadArticlesEpic(action$, null, deps)
            .toPromise(Promise)
            .then(action => {
                expect(action.type).toBe(articles.ERROR)
                expect(action.message).toEqual('Noop')
                done()
            })
            .catch(error => {fail(error); done()})
    }, 1000)
})

describe('Epics :: articles :: loadOneArticleEpic', () => {
    it('dispatches ONE_LOADED action on fetch succeed', done => {
        const action$ = ActionsObservable.of(articles.loadOne(1))
        const articleMock = {
            id: 1,
            title: 'This is a cool article about cats',
        }
        const deps = {
            fetchApi: () => Promise.resolve(articleMock)
        }

        epic.loadOneArticleEpic(action$, null, deps)
            .toPromise(Promise)
            .then(action => {
                expect(action.type).toBe(articles.ONE_LOADED)
                expect(action.article).toEqual(articleMock)
                done()
            })
            .catch(error => {fail(error); done()})
    }, 1000)

    it('dispatches ERROR action on fetch failure', done => {
        const action$ = ActionsObservable.of(articles.loadOne(10))
        const deps = {
            fetchApi: () => Promise.reject('error')
        }

        epic.loadOneArticleEpic(action$, null, deps)
            .toPromise(Promise)
            .then(action => {
                expect(action.type).toBe(articles.ERROR)
                expect(action.message).toEqual('error')
                done()
            })
            .catch(error => {fail(error); done()})
    }, 1000)
})
