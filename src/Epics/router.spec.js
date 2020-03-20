import { ActionsObservable } from "redux-observable";
import * as router from './../Redux/State/router'
import * as epic from './router'

describe('Epics :: router :: routerValid', () => {
  it('determines if a route is valid', () => {
    expect(
        epic.routeValid(['a'])(`^\/article\/([\w-]+)\/?$`)
    ).toBeTruthy()

    expect(
      epic.routeValid(['a', 'b'])(`^\/article\/([\w-]+)\/?$`)
    ).toBeFalsy()

    expect(
      epic.routeValid(['a'])(`^\/article\/([\w-]+)\/([\w-]+)\/?$`)
    ).toBeFalsy()
  })
})

describe('Epics :: router :: registerRouteEpic', () => {
  it('dispatches REGISTERED action', done => {
    const action$ = ActionsObservable.of(router.register(
      'articles',
      `^\/article\/([\w-]+)\/([\w-]+)\/?$`,
      ['a', 'b'],
    ))

    epic.registerRouteEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(router.REGISTERED)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('dispatches ERROR action when the pattern is not a regex', done => {
    const action$ = ActionsObservable.of(router.register(
      'bad-regex-format',
      `(.-`,
    ))

    epic.registerRouteEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(router.ERROR)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('dispatches ERROR action when parameters mismatches', done => {
    const action$ = ActionsObservable.of(router.register(
      'not-enough-parameters',
      `^\/article\/([\w-]+)\/?$`,
      [],
    ))

    epic.registerRouteEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(router.ERROR)
        expect(action.message).toBe(epic.nonMatchingParametersNumberException)
        done()
      })
      .catch(error => {fail(error); done()})
  })
})

describe('Epics :: router :: pathMatchesRoutePattern', () => {
  it('determines that a path matches a route pattern', () => {
    const routeMock = { pattern: `^\/article\/test\/?$` }

    expect(
      epic.pathMatchesRoutePattern('/article/test')(routeMock)
    ).toBeTruthy()

    expect(
      epic.pathMatchesRoutePattern('/test/a')(routeMock)
    ).toBeFalsy()
  })
})
