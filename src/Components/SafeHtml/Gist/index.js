import Gist from './Gist'
import { extractGistIdFromUrl } from './../../../Utils'
import { connect } from 'react-redux'
import { componentDidMount } from 'react-functional-lifecycle'
import { renderGist } from './../../../Redux/State/gists'
import { compose } from 'ramda'

// mapStateToProps :: (State, Props) -> Props
const mapStateToProps = (state, ownProps) => ({
  id: extractGistIdFromUrl(ownProps.url),
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  renderGist: compose(dispatch, renderGist),
})

// didMount :: Props -> Action
const didMount = ({ id, renderGist }) => renderGist(id)

// lifecycles :: React.Component -> React.Component
const lifecycles = componentDidMount(didMount)(Gist)

// Gist :: Props -> React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
