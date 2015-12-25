import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as completeActions } from '../redux/modules/complete'
import Container from 'layouts/TransparentContainerLayout'
import EndScreen from 'components/EndScreen'
import LoadingScreen from 'components/LoadingScreen'
import Modal from 'components/Modal'

const mapStateToProps = (state) => ({
  ...state.complete
})

class CompleteView extends Component {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    send: PropTypes.func.isRequired
  }

  componentDidMount () {
    // TODO: What if user access this route directly
    // with out being redirect by QuizView
    this.props.send()
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
      <Container xs={12} sm={10} md={8} lg={6}>
        {component}
      </Container>
    )
  }
}

export default connect(mapStateToProps, completeActions)(CompleteView)
