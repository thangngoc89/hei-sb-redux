import React from 'react';
import style from './style.css'
import CSSModules from 'react-css-modules'

const LoadingScreen = () => {
  return (
    <div styleName='loading-screen'>
      <div styleName="loading-animation">
        <div styleName="loading-animation__bounce-1"></div>
        <div styleName="loading-animation__bounce-2"></div>
        <div styleName="loading-animation__bounce-3"></div>
      </div>
      loading&hellip;
    </div>
  )
}

export default CSSModules(LoadingScreen, styles)
