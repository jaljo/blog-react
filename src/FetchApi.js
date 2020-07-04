// FetchApi :: (Fetch, String) -> (String, Object) -> Promise
export default (fetcher, baseUrl) => (path, options = {}) =>
  fetcher(`${baseUrl}${path}`, options)
    .then(response => response.json())
