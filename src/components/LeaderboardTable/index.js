import { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './style.scss'
import LeaderboardTbody from 'components/LeaderboardTbody'
import moment from 'moment'

class LeaderboardTable extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    lastUpdate: PropTypes.string.isRequired
  }
  render () {
    const lastUpdate = moment(this.props.lastUpdate).fromNow()

    return (
      <div>
        <div className='pull-right'>
          Last update: {lastUpdate}
        </div>
        <div className='table-responsive'>
          <table className='table table-hover table-striped'>
            <thead styleName='thead'>
              <tr>
                <th>Rank</th>
                <th>Full name</th>
                <th>University</th>
                <th>Score</th>
                <th>Time</th>
              </tr>
            </thead>
              <LeaderboardTbody data={this.props.data} />
          </table>
        </div>
      </div>
    )
  }
}

export default CSSModules(LeaderboardTable, styles)
