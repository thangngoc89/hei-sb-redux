import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux/modules/leaderboard'
import LoadingScreen from 'components/LoadingScreen'
import LeaderboardTable from 'components/LeaderboardTable'

const mapStateToProps = (state) => ({
  ...state.leaderboard
})

class LeaderboardContainer extends React.Component {
  componentDidMount () {
    this.props.fetch()
  }

  render () {
    const { isLoading, fetchSuccess } = this.props

    return (
      <div>
        {isLoading && <LoadingScreen />}
        {fetchSuccess &&
          <LeaderboardTable
            data={this.props.data}
            lastUpdate={this.props.lastUpdate}
          />
        }
        {!fetchSuccess &&
          <h3 style={{textAlign: 'center'}}>Nothing to show yet</h3>
        }
      </div>
    )
  }
}

LeaderboardContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.array,
  lastUpdate: PropTypes.string,
  fetchSuccess: PropTypes.bool,
  fetch: PropTypes.func.isRequired
}

export default connect(mapStateToProps, actions)(LeaderboardContainer)
