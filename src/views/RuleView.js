import React from 'react'
import Container from 'layouts/TransparentContainerLayout'
import QuizInstruction from 'components/QuizInstruction'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'
import styles from './RuleView.scss'

export class RuleView extends React.Component {
  render () {
    return (
      <Container xs={12} sm={10} md={6}>
        <QuizInstruction />
        <Link to='/login'>
          <Button block className={styles.readyButton}>Ready</Button>
        </Link>
      </Container>
    )
  }
}

export default RuleView
