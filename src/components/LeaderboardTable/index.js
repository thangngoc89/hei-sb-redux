import { PropTypes } from 'react'
import styles from './style.scss'
import Table from 'react-toolbox/lib/table'
import LastUpdate from './LastUpdate'
import map from 'lodash/map'

const ResultModel = {
  rank: {type: String},
  fullName: {type: String},
  university: {type: String},
  score: {type: Number},
  time: {type: String}
}

const convertMS = (ms) => {
  let m, s
  s = Math.floor(ms / 1000)
  m = Math.floor(s / 60)
  s = s % 60
  // h = Math.floor(m / 60)
  // m = m % 60
  // d = Math.floor(h / 24)
  // h = h % 24
  s = (s < 10) ? `0${s}` : s
  return `${m}:${s}`
}

class LeaderboardTable extends React.Component {
  processData () {
    const data = map(this.props.data.toJS(), (row) => {
      return {
        ...row,
        time: convertMS(row['time'])
      }
    })

    return data
  }

  render () {
    return (
      <section>
        <div className='pull-right'>
          <LastUpdate
            time={this.props.lastUpdate}
            interval={10}
          />
        </div>
        <div className='table-responsive'>
          <Table
            className={styles.table}
            selectable={false}
            model={ResultModel}
            source={this.processData()}
          />
        </div>
      </section>
    )
  }
}

LeaderboardTable.propTypes = {
  data: PropTypes.array.isRequired,
  lastUpdate: PropTypes.string.isRequired
}

export default LeaderboardTable
