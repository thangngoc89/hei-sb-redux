import CSSModules from 'react-css-modules'
import LeaderboardContainer from 'containers/LeaderboardContainer'
import styles from './LeaderboardView.scss'

class LeaderboardView extends React.Component {
  render () {
    return (
      <div styleName='main-div'>
        <div className='container-fluid'>
            <div className='row'>
              <div className='col-xs-12' styleName='header'>
                <p styleName='title'>Spelling Bee <em>Ranking</em></p>
                <p styleName='sub-title'>Top 10 participants who have achieved the highest scores are proudly nominated here.</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12 col-sm-10 center-block'>
                <LeaderboardContainer />
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(LeaderboardView, styles)
