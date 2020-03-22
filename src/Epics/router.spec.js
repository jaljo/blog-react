import * as epic from './router'
import * as router from './../Redux/State/router'
import { ActionsObservable } from 'redux-observable'
import { createObservableState } from './../Utils'

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

  it('dispatches a 500 ERROR action when the pattern is not a regex', done => {
    const action$ = ActionsObservable.of(router.register(
      'bad-regex-format',
      `(.-`,
    ))

    epic.registerRouteEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(router.ERROR)
        expect(action.httpCode).toBe(500)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('dispatches a 500 ERROR action when parameters mismatches', done => {
    const action$ = ActionsObservable.of(router.register(
      'not-enough-parameters',
      `^\/article\/([\w-]+)\/?$`,
      [],
    ))

    epic.registerRouteEpic(action$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(router.ERROR)
        expect(action.httpCode).toBe(500)
        expect(action.message).toBe(epic.nonMatchingParametersNumberException())
        done()
      })
      .catch(error => {fail(error); done()})
  })
})

describe('Epics :: router :: resolveFirstLocationEpic', () => {
  it('dispatches FIND_ROUTE action', done => {
    const action$ = ActionsObservable.of(router.ready())
    const deps = {
      window: {
        location: {
          pathname: '/a/b/cdef'
        }
      }
    }

    epic.resolveFirstLocationEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(router.FIND_ROUTE)
        expect(action.location).toBe('/a/b/cdef')
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)
})

describe('Epics :: router :: changeRouteEpic', () => {
  it('dispatches FIND_ROUTE action', done => {
    const action$ = ActionsObservable.of(router.changeRoute('/test/1234'))
    const deps = {
      window: {
        history: {
          pushState: () => null
        },
      },
    }

    epic.changeRouteEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(router.FIND_ROUTE)
        expect(action.location).toBe('/test/1234')
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)
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

describe('Epics :: router :: findRouteEpic', () => {
  it('dispatches ROUTE_FOUND action', done => {
    const action$ = ActionsObservable.of(router.findRoute('/test/1234'))
    const mockRoute = {
      name: 'test-details',
      pattern: new RegExp(/^\/test\/([\d]+)\/?$/),
      parameters: ['id'],
    }
    const state$ = createObservableState({
      router: {
        routes: [mockRoute],
      }
    })

    epic.findRouteEpic(action$, state$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(router.ROUTE_FOUND)
        expect(action.location).toBe('/test/1234')
        expect(action.route).toEqual(mockRoute)
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)

  it('dispatches a 404 ERROR when the route is not found', done => {
    const action$ = ActionsObservable.of(router.findRoute('/test/1234'))
    const state$ = createObservableState({
      router: { routes: [] }
    })

    epic.findRouteEpic(action$, state$)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(router.ERROR)
        expect(action.httpCode).toBe(404)
        expect(action.message).toBe('The requested location has not been found: /test/1234')
        done()
      })
      .catch(error => { fail(error); done() })
  }, 1000)
})

describe('Epics :: router :: scrollToTopOnPageChangeEpic', () => {
  it('resets the scroll position on route change', done => {
    const action$ = ActionsObservable.of(router.changeRoute())
    const scrollCall = []
    const deps = {
      window: {
        scroll: (a, b) => scrollCall.push([a, b])
      }
    }

    epic.scrollToTopOnPageChangeEpic(action$, null, deps)
      .toPromise(Promise)
      .then(() => {
        expect(scrollCall).toHaveLength(1)
        expect(scrollCall[0]).toEqual([0, 0])
        done()
      })
      .catch(error => {fail(error); done()})
  })
})
