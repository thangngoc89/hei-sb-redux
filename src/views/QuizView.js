import React from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './QuizView.scss'
import Container from 'layouts/TransparentContainerLayout'
import { Col, Row } from 'react-bootstrap'
import QuizHeader from 'components/QuizHeader'
import QuizBody from 'components/QuizBody'
import QuizFooter from 'components/QuizFooter'

export class QuizView extends React.Component {
  render () {
    let outsideContainer = (<Link to='/'>&#8592; return home</Link>)

    return (
      <Container xs={12} sm={10} md={7} outside={outsideContainer} colClassName={styles.container}>
        <Row>
          <Col xs={12} styleName='header'>
            <QuizHeader />
          </Col>
          <Col xs={12} styleName='content'>
            <QuizBody />
          </Col>
          <Col xs={1} xsOffset={10} styleName='footer'>
            <QuizFooter />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default CSSModules(QuizView, styles)
