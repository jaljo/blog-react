import BlogPost from './BlogPost'
import { componentDidMount } from 'react-functional-lifecycle'
import { connect } from 'react-redux'
import { loadOne } from '../../Redux/State/articleDetails'
import { pipe, compose } from 'ramda'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  error: state.articleDetails.error,
  isLoading: state.articleDetails.isLoading,
  article: state.articleDetails.article,
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
const blogPostLifecycles = pipe(
  componentDidMount(didMount),
)(BlogPost)

// BlogPost :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(blogPostLifecycles)
