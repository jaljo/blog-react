import * as epic from './articleDetails'
import * as articleDetails from './../Redux/State/articleDetails'
import { ActionsObservable } from 'redux-observable'

describe('Epics :: articleDetails :: loadOneArticleEpic', () => {
  it('dispatches ONE_LOADED action on fetch succeed', done => {
    const action$ = ActionsObservable.of(articleDetails.loadOne(1))
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
        expect(action.type).toBe(articleDetails.ONE_LOADED)
        expect(action.article).toEqual(articleMock)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('dispatches ERROR action on fetch failure', done => {
    const action$ = ActionsObservable.of(articleDetails.loadOne(10))
    const deps = {
      fetchApi: () => Promise.reject('error')
    }

    epic.loadOneArticleEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(articleDetails.ERROR)
        expect(action.message).toEqual('error')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})
