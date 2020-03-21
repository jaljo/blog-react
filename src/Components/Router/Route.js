import { register } from './../../Redux/State/router'
import { componentDidMount } from 'react-functional-lifecycle'
import { connect } from 'react-redux'
import { compose } from 'ramda'

// view :: Props -> Maybe React.Component
const view = ({
  activeRoute,
  name,
  children,
}) => activeRoute.name === name
  ? children
  : null

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  activeRoute: state.router.activeRoute,
})

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  register: compose(dispatch, register),
})

// didMount :: Props -> Action REGISTER
const didMount = ({
  name,
  parameters,
  pattern,
  register,
}) => register(name, pattern, parameters)

// lifecycles :: Maybe React.Component -> Maybe React.Component
const lifecycles = compose(
  componentDidMount(didMount)
)(view)

// Route :: Props -> Maybe React.Component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
