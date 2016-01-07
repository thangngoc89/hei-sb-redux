import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as completeActions } from 'redux/modules/complete'
import Container from 'layouts/MaterialBox'
import EndScreen from 'components/EndScreen'
import LoadingScreen from 'components/LoadingScreen'
import HomeLink from 'components/HomeLink'

const mapStateToProps = (state) => ({
  isLoading: state.complete.get('isLoading'),
  score: state.complete.get('score')
})

class CompleteView extends React.Component {
  componentDidMount () {
    this.props.send()
  };

  componentWillUnmount () {
    // Reset CompleteView state when leave
    this.props.completeReset()
  };

  render () {
    const { isLoading, score } = this.props

    return (
      <Container xs={12} sm={10} md={8} lg={6} outside={<HomeLink />}>
        <div>
          {isLoading && <LoadingScreen />}
          {(score !== undefined) && <EndScreen score={score} />}
        </div>
      </Container>
    )
  }
}

CompleteView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  score: PropTypes.number,
  send: PropTypes.func.isRequired,
  completeReset: PropTypes.func.isRequired
}

export default connect(mapStateToProps, completeActions)(CompleteView)
