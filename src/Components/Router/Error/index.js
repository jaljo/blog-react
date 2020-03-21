import Error from './Error'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  error: state.router.error,
})

export default connect(
  mapStateToProps
)(Error)
