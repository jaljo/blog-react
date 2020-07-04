import { ActionsObservable } from 'redux-observable'
import { renderGist, GIST_RENDERED } from './../Redux/State/gists'
import * as epic from './gists'
import { fail } from 'assert';

describe('Epics :: gists :: getIframeDocument', () => {
  it('can retrieve the document object of an iframe', () => {
    const iframe = { document: 'my doc' }
    expect(epic.getIframeDocument(iframe)).toBe('my doc')

    const iframe2 = { contentDocument: 'my doc 2' }
    expect(epic.getIframeDocument(iframe2)).toBe('my doc 2')

    const iframe3 = { contentWindow: 'my doc 3' }
    expect(epic.getIframeDocument(iframe3)).toBe('my doc 3')
  })
})

describe('Epics :: gists :: renderGistEpic', () => {
  it('dispatches GIST_RENDRED action', done => {
    const action$ = ActionsObservable.of(renderGist('1234'))
    const deps = {
      document: {
        getElementById: () => ({
          document: {
            open: () => null,
            writeln: () => null,
            close: () => null,
          },
        }),
      },
    }

    epic.renderGistEpic(action$, null, deps)
      .toPromise(Promise)
      .then(action => {
        expect(action.type).toBe(GIST_RENDERED)
        expect(action.id).toBe('1234')
        done()
      })
      .catch(error => {fail(error); done()})
  }, 1000)
})
