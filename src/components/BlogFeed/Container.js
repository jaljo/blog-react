import { connect } from 'react-redux'
import BlogFeed from './BlogFeed'
import { loadBlogPosts } from '../../modules/blog'
import { compose } from 'ramda'

const mapStateToProps = state => ({
  blog: state.blog
})

const mapDispatchToProps = dispatch => ({
  initPostsLoading: compose(dispatch, loadBlogPosts)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogFeed)
