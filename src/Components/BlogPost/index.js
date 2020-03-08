import { componentDidMount } from 'react-functional-lifecycle'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { loadOne } from '../../Redux/State/blog'
import BlogPost from './BlogPost'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  error: state.blog.error,
  isLoading : state.blog.isLoading,
  post: state.blog.post,
})

// mapDispatchToProps :: (Action * -> State) -> Action
const mapDispatchToProps = dispatch => ({
  initPostLoading: compose(dispatch, loadOne),
})

// didMount :: Props -> Action.LOAD_ONE
const didMount = ({
  match,
  initPostLoading,
}) => initPostLoading(match.params.seoTitle)

// blogPostLifecycles :: React.Component -> React.Component
const blogPostLifecycles = compose(
  componentDidMount(didMount),
)(BlogPost)

// BlogPost :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(blogPostLifecycles)
