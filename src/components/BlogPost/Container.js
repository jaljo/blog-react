import { componentDidMount } from 'react-functional-lifecycle'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { loadOne } from '../../modules/blog'
import BlogPost from './BlogPost'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  post: state.blog.post,
  isLoading : state.blog.isLoading,
})

// mapDispatchToProps :: (Action * -> State) -> Action
const mapDispatchToProps = dispatch => ({
  initPostLoading: compose(dispatch, loadOne),
})

// onMount :: Props -> Action
const onMount = ({
  match,
  initPostLoading
}) => initPostLoading(match.params.seoTitle)

const blogPostLifecycles = compose(
  componentDidMount(onMount),
)(BlogPost)

// BlogPost :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(blogPostLifecycles)
