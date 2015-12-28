import styles from './style.scss'

const EndScreen = ({ score }) => {
  return (
    <div>
      <h1 className={styles.center}>Congratulations!</h1>
      <hr />
      <p>You have finished the test with {score} / 30 points</p>
      <p>We really appreciate your partipation</p>
      <h4>Thank you so much</h4>
    </div>
  )
}

export default EndScreen
