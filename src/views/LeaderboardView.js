import CSSModules from 'react-css-modules'
import { Grid, Row, Col } from 'react-bootstrap'
import LeaderboardContainer from 'containers/LeaderboardContainer'
import styles from './LeaderboardView.scss'

class LeaderboardView extends React.Component {
  render () {
    return (
      <div styleName='main-div'>
        <Grid fluid>
            <Row>
              <Col xs={12} styleName='header'>
                <p styleName='title'>Spelling Bee <em>Ranking</em></p>
                <p styleName='sub-title'>Top 10 participants who have achieved the highest scores are proudly nominated here.</p>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={10} smPush={1}>
                <LeaderboardContainer />
              </Col>
            </Row>
        </Grid>
      </div>
    )
  }
}

export default CSSModules(LeaderboardView, styles)
