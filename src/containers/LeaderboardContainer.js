import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions } from 'redux/modules/leaderboard'
import LoadingScreen from 'components/LoadingScreen'
import LeaderboardTable from 'components/LeaderboardTable'

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
        {(fetchSuccess === false) &&
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

const mapStateToProps = (state) => ({
  isLoading: state.leaderboard.get('isLoading'),
  data: state.leaderboard.get('data'),
  lastUpdate: state.leaderboard.get('lastUpdate'),
  fetchSuccess: state.leaderboard.get('fetchSuccess')
})
export default connect(mapStateToProps, actions)(LeaderboardContainer)
