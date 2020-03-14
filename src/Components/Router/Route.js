import { register } from './../../Redux/State/router'
import { componentDidMount } from 'react-functional-lifecycle'
import { connect } from 'react-redux'
import { compose } from 'ramda'

const view = ({
  activeRoute,
  name,
  children,
}) => activeRoute.name === name
  ? children
  : null

const mapStateToProps = state => ({
  activeRoute: state.router.activeRoute,
})

const mapDispatchToProps = dispatch => ({
  register: compose(dispatch, register),
})

const didMount = ({ name, pattern, register }) => register(name, pattern)

const lifecycles = compose(
  componentDidMount(didMount)
)(view)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(lifecycles)
