import { connect } from 'react-redux'
import { compose } from 'ramda'
import { changeRoute } from './../../../Redux/State/router'
import Link from './Link'

// mapDispatchToProps :: (Action * -> State) -> Props
const mapDispatchToProps = dispatch => ({
  changeRoute: compose(dispatch, changeRoute),
})

// Link :: Props -> React.Component
export default connect(
  null,
  mapDispatchToProps,
)(Link)
