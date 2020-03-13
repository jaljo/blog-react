import { map, mergeMap, catchError, tap } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { of, from } from 'rxjs'
import {
  LOAD_ONE,
  error,
  oneLoaded,
} from './../Redux/State/articleDetails'

// loadOneArticleEpic :: Epic -> Observable Action ONE_LOADED ERROR
export const loadOneArticleEpic = (action$, state$, { fetchApi, parser }) =>
  action$.pipe(
    ofType(LOAD_ONE),
    mergeMap(({ slug }) => from(
      fetchApi(`/articles/${slug}`)
    ).pipe(
      map(oneLoaded),
      tap(({ article }) => {
        console.warn(
          parser(article.content)
        )
      }),
      catchError(msg => of(error(msg))),
    )),
  )

export default combineEpics(
  loadOneArticleEpic,
)
