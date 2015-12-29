import styles from './style.scss'

const EndScreen = ({ score }) => {
  return (
    <div>
      <p className={styles.center}>Congratulations!</p>
      <hr />
      <p>You have finished the test with {score} / 30 points</p>
      <p>We really appreciate your partipation</p>
      <p>For further information, please follow our fanpage at: &nbsp;
        <a href='//fb.me/engclubhei' target='_blank'>fb.me/engclubhei</a>
      </p>
      <p>Thank you so much</p>
    </div>
  )
}

export default EndScreen
