import { connect } from 'react-redux'
import BlogFeed from './BlogFeed'
import { loadBlogPosts } from '../../modules/blog'
import { compose } from 'ramda'
import { componentDidMount } from 'react-functional-lifecycle'

const mapStateToProps = state => ({
  blog: state.blog
})

const mapDispatchToProps = dispatch => ({
  initPostsLoading: compose(dispatch, loadBlogPosts)
})

const onMount = ({ initPostsLoading }) => initPostsLoading()

const BlogFeedLifecycles = compose(
    componentDidMount(onMount),
)(BlogFeed);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogFeedLifecycles)
