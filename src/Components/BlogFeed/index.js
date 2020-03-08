import { connect } from 'react-redux'
import { compose } from 'ramda'
import { componentDidMount } from 'react-functional-lifecycle'
import { loadArticles } from '../../Redux/State/articles'
import BlogFeed from './BlogFeed'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  articles: state.articles.articles,
  isLoading : state.articles.isLoading,
  error: state.articles.error,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  initPostsLoading: compose(dispatch, loadArticles),
})

// didMount :: Props -> Action.LOAD_ARTICLES
const didMount = ({ initPostsLoading }) => initPostsLoading()

// blogFeedLifecycles :: React.Component -> React.Component
const blogFeedLifecycles = compose(
  componentDidMount(didMount),
)(BlogFeed)

// BlogFeed :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(blogFeedLifecycles)
