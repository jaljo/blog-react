export const RENDER_GIST = '@blog-frontend/gists/RENDER_GIST'
export const GIST_RENDERED = '@blog-frontend/gists/GIST_RENDERED'

// renderGist :: String -> Action
export const renderGist = id => ({
  type: RENDER_GIST,
  id,
})

// gistRendered :: String -> Action
export const gistRendered = id => ({
  type: GIST_RENDERED,
  id,
})
