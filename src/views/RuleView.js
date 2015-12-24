import React from 'react'
import Container from 'layouts/TransparentContainerLayout'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'
import styles from './RuleView.scss'
import rules from 'assets/markdown/rules.md'

const RuleView = () => {
  return (
    <Container xs={12} sm={10} md={8} lg={6}>
      <div>
        <div dangerouslySetInnerHTML={{__html: rules}}></div>
        <Link to='/login'>
          <Button block className={styles.readyButton}>Ready</Button>
        </Link>
      </div>
    </Container>
  )
}

export default RuleView
