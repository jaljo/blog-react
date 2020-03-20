import {
  INITIAL_STATE,
  default as reducer,
  register,
  routeFound,
} from './router'

describe('Redux :: State :: router', () => {
  it('reduces register action', () => {
    const action = register('route', '^\/article\/([\w-]+)\/?$', ['slug'])

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
    expect(
      reducer(INITIAL_STATE, routeFound('route', { slug: 'test' }))
    ).toEqual({
      ...INITIAL_STATE,
      activeRoute: {
        name: 'route',
        parameters: {
          slug: 'test',
        }
      }
    })
  })
})
