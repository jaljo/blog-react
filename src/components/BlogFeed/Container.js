import { connect } from 'react-redux'
import { compose } from 'ramda'
import { componentDidMount } from 'react-functional-lifecycle'
import { loadBlogPosts } from '../../modules/blog'
import BlogFeed from './BlogFeed'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  posts: state.blog.posts,
  isLoading : state.blog.isLoading,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  initPostsLoading: compose(dispatch, loadBlogPosts),
})

// onMount :: Props -> Action
const onMount = ({ initPostsLoading }) => initPostsLoading()

// blogFeedLifecycles :: View -> View
const blogFeedLifecycles = compose(
  componentDidMount(onMount),
)(BlogFeed)

// BlogFeed :: view -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(blogFeedLifecycles)
