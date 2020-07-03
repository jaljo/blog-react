```javascript
@type Article = {
  id :: Number
  title :: String
  slug :: String
  content :: String
  dateCreation :: String
  draft :: Number
}

@type Component = {
  type :: String
  children: [Component]
  content: Maybe String
}

@type Document
@see https://developer.mozilla.org/fr/docs/Web/API/Document

@type Node
@see https://developer.mozilla.org/fr/docs/Web/API/Node

@type Route = {
  name :: String
  pattern :: String
  parameters :: [String]
}
```
