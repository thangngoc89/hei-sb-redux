import { Link } from 'react-router'
import { Button, Row, Col, Grid } from 'react-bootstrap'
import styles from './RuleView.scss'
import rules from 'assets/markdown/rules.md'
import CSSModules from 'react-css-modules'

class RuleView extends React.Component {
  render () {
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} styleName='header'>
            <p styleName='title'>Spelling Bee <em>2016</em></p>
            <p styleName='sub-title'>hosted by H.E.I. English Speaking Club, UMP, HCMC</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10} md={8} lg={6} className='center-block'>
            <div className='material-box'>
              <div dangerouslySetInnerHTML={{__html: rules}}></div>
              <Link to='/login'>
                <Button block className={styles.readyButton}>Ready</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default CSSModules(RuleView, styles)
