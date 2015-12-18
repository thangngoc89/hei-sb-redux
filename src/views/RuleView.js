import React from 'react'
import Container from 'layouts/TransparentContainerLayout'
import QuizInstruction from 'components/QuizInstruction'
import { Button } from 'react-bootstrap'
import styles from './RuleView.scss'

export class RuleView extends React.Component {
  render () {
    return (
      <Container xs={12} sm={10} md={7}>
        <QuizInstruction />
        <Button block className={styles.readyButton}>Ready</Button>
      </Container>
    )
  }
}

export default RuleView
