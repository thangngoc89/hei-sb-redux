import styles from './style.css'

const LoadingScreen = () => {
  return (
    <div className={styles['loading-screen']}>
      <div className={styles['loading-animation']}>
        <div className={styles['bounce-1']}></div>
        <div className={styles['bounce-2']}></div>
        <div></div>
      </div>
      loading&hellip;
    </div>
  )
}

export default LoadingScreen
