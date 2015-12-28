import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as completeActions } from '../redux/modules/complete'
import Container from 'layouts/TransparentContainerLayout'
import EndScreen from 'components/EndScreen'
import LoadingScreen from 'components/LoadingScreen'
import Modal from 'components/Modal'
import HomeLink from 'components/HomeLink'

const mapStateToProps = (state) => ({
  ...state.complete
})

class CompleteView extends React.Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    send: PropTypes.func.isRequired,
    completeReset: PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.send()
  }

  componentWillUnmount () {
    // Reset CompleteView state when leave
    this.props.completeReset()
  }

  render () {
    let component

    if (this.props.error) {
      component = (
        <Modal
          show
          close={this.props.send}
          title='Oh snap!'
          body={`There was a problem while trying to send your answers to us.
            Please check your internet connection and click the RETRY button below.`}
          button='Retry'
        />
      )
    } else if (this.props.isLoading) {
      component = <LoadingScreen />
    } else {
      component = <EndScreen />
    }

    return (
      <Container xs={12} sm={10} md={8} lg={6} outside={<HomeLink />}>
        {component}
      </Container>
    )
  }
}

export default connect(mapStateToProps, completeActions)(CompleteView)
