import styles from './style.scss'

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

const createRow = (row) => {
  return (
    <tr key={row.rank}>
      <th scope='row' className={styles.th}>#{row.rank}</th>
      <td>{row.fullName}</td>
      <td>{row.university}</td>
      <td>{row.score}</td>
      <td>{convertMS(row.time)}</td>
    </tr>
  )
}

const LeaderboardTbody = ({ data }) => {
  return (
    <tbody>
      {data.map(createRow)}
    </tbody>
  )
}

export default LeaderboardTbody
