import { combineEpics, ofType } from 'redux-observable'
import { of } from 'rxjs'
import { tap, map, switchMap } from 'rxjs/operators'
import { RENDER_GIST, gistRendered } from './../Redux/State/gists'
import {
  T,
  complement,
  cond,
  isNil,
  o,
  prop,
} from 'ramda'

// @see https://github.com/tleunen/react-gist/blob/master/src/index.js
//
// createIframeHtml :: String -> String
const createIframeHtml = gistId => `
  <html>
    <head>
      <base target="_parent">
      <style>
        * {
          font-size:12px;
        }
        body {
          margin:0;
        }
      </style>
    </head>
    <body
      onload="parent.document.getElementById('${gistId}').style.height=document.body.scrollHeight + 'px'"
    >
      <script
        type="text/javascript"
        src="https://gist.github.com/${gistId}.js">
      </script>
    </body>
  </html>
`

// getIframeDocument :: Element.Iframe -> Document
export const getIframeDocument = cond([
  [o(complement(isNil), prop('contentDocument')), prop('contentDocument')],
  [o(complement(isNil), prop('contentWindow')), prop('contentWindow')],
  [T, prop('document')],
])

// renderGistEpic :: Epic -> _
export const renderGistEpic = (action$, _, { document }) =>
  action$.pipe(
    ofType(RENDER_GIST),
    switchMap(({ id }) => of(document.getElementById(id)).pipe(
      map(getIframeDocument),
      tap(doc => doc.open()),
      tap(doc => doc.writeln(createIframeHtml(id))),
      tap(doc => doc.close()),
      map(() => gistRendered(id)),
    )),
  )

export default combineEpics(
  renderGistEpic
)
