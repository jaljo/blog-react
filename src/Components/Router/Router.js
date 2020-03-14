import { componentDidMount } from 'react-functional-lifecycle'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { ready } from './../../Redux/State/router'

const view = ({ children }) => children

const mapDispatchToProps = dispatch => ({
  ready: compose(dispatch, ready),
})

const didMount = ({ ready }) => ready()

const lifecycles = compose(
  componentDidMount(didMount),
)(view)

export default connect(
  null,
  mapDispatchToProps,
)(lifecycles)
