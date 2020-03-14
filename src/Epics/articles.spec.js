import * as epic from './articles'
import * as articles from './../Redux/State/articles'
import { ActionsObservable } from 'redux-observable'
import { identity } from 'ramda'

describe('Epics :: articles :: loadArticlesEpic', () => {
  it('dispatches ARTICLES_LOADED action on fetch succeed', done => {
    const action$ = ActionsObservable.of(articles.loadArticles())
    const articlesMock = [{
      content: '<p>This is a content</p>'
    }]
    const deps = {
      fetchApi: () => Promise.resolve(articlesMock),
      parseHtml: identity,
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
