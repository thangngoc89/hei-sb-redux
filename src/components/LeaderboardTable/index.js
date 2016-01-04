import { PropTypes } from 'react'
import styles from './style.scss'
import Table from 'react-toolbox/lib/table'
import LastUpdate from './LastUpdate'

const ResultModel = {
  rank: {type: String},
  fullName: {type: String, field: 'Full name'},
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
  static propTypes = {
    data: PropTypes.array.isRequired,
    lastUpdate: PropTypes.string.isRequired
  }

  processData () {
    let data = this.props.data
    for (let i = 0; i < data.length; i++) {
      let currentTime = data[i]['time']
      if (typeof currentTime === 'number') {
        data[i]['time'] = convertMS(currentTime)
      }
    }
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

export default LeaderboardTable
