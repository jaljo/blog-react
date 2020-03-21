import { componentDidMount } from 'react-functional-lifecycle'
import { connect } from 'react-redux'
import { compose } from 'ramda'
import { ready } from './../../Redux/State/router'

// view :: Props -> React.Component
const view = ({ children }) => children

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  ready: compose(dispatch, ready),
})

// didMount :: Props -> Action READY
const didMount = ({ ready }) => ready()

// lifecycles :: React.Component -> React.Component
const lifecycles = compose(
  componentDidMount(didMount),
)(view)

// Router :: Props -> React.Component
export default connect(
  null,
  mapDispatchToProps,
)(lifecycles)
