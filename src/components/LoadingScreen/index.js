import React from 'react'
import styles from './style.css'
import CSSModules from 'react-css-modules'

const LoadingScreen = () => {
  return (
    <div styleName='loading-screen'>
      <div styleName='loading-animation'>
        <div styleName='bounce-1'></div>
        <div styleName='bounce-2'></div>
        <div></div>
      </div>
      loading&hellip;
    </div>
  )
}

export default CSSModules(LoadingScreen, styles)
