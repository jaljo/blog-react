import {
  INITIAL_STATE,
  default as reducer,
  registered,
  routeFound,
  resolveParameters,
} from './router'

describe('Redux :: State :: router', () => {
  it('extracts parameters from a path', () => {
    // only one parameter to resolve
    const routeMock = {
      pattern: new RegExp(/^\/test\/([\d]+)\/?$/),
      parameters: ['id'],
    }

    expect(
      resolveParameters(routeMock)('/test/1234')
    ).toEqual({
      id: '1234',
    })

    // two parameters to resolve
    const routeMock2 = {
      pattern: new RegExp(/^\/route\/([\w-]+)\/([\w]+)\/?$/),
      parameters: ['slug', 'id'],
    }

    expect(
      resolveParameters(routeMock2)('/route/a-wonderful-slug/12345')
    ).toEqual({
      slug: 'a-wonderful-slug',
      id: '12345',
    })
  })

  it('reduces register action', () => {
    const action = registered('route', '^\/article\/([\w-]+)\/?$', ['slug'])

    expect(
      reducer(INITIAL_STATE, action)
    ).toEqual({
      ...INITIAL_STATE,
      routes: [
        {
          name: 'route',
          pattern: '^\/article\/([\w-]+)\/?$',
          parameters: ['slug'],
        }
      ]
    })
  })

  it('reduces routeFound action', () => {
    const routeMock = {
      name: 'article-details',
      pattern: new RegExp(/^\/article\/([\w-]+)\/?$/),
      parameters: ['slug'],
    }

    expect(
      reducer(INITIAL_STATE, routeFound('/article/lorem-ipsum', routeMock))
    ).toEqual({
      ...INITIAL_STATE,
      activeRoute: {
        name: 'article-details',
        parameters: {
          slug: 'lorem-ipsum',
        }
      }
    })
  })
})
