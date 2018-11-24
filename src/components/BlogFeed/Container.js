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

// didMount :: Props -> Action.LOAD_BLOG_POSTS
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
