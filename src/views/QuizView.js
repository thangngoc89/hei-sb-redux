import React from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import styles from './QuizView.scss'
import Container from 'layouts/TransparentContainerLayout'
import { Button } from 'react-bootstrap'

export class QuizView extends React.Component {
  render () {
    let outsideContainer = (<Link to='/'>&#8592; return home</Link>)

    return (
      <Container xs={12} sm={10} md={8} outside={outsideContainer}>
        <div className='col-xs-12 content'>
          content goes here
        </div>
        <div className='col-xs-2 col-xs-offset-10 footer'>
          <Button bsStyle='danger'>Next</Button>
        </div>
      </Container>
    )
  }
}

export default CSSModules(QuizView, styles)
