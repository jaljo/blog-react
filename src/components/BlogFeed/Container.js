import { connect } from 'react-redux'
import BlogFeed from './BlogFeed'
import { loadBlogPosts } from '../../modules/blogpost'
import { compose } from 'ramda'

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = dispatch => ({
  initPostsLoading: compose(dispatch, loadBlogPosts)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogFeed)
