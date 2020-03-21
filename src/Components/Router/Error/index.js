import Error from './Error'
import { connect } from 'react-redux'

// mapStateToProps :: State -> Props
const mapStateToProps = state => ({
  error: state.router.error,
})

// Error :: Props -> React.Component
export default connect(
  mapStateToProps
)(Error)
