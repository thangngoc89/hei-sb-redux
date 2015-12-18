import React, { PropTypes } from 'react'
import { Col, Row, Grid } from 'react-bootstrap'

const TransparentContainerLayout = (props) => {
  // TODO: Refactor this
  let col = {}

  if (props.xs) col.xs = props.xs
  if (props.sm) col.sm = props.sm
  if (props.md) col.md = props.md
  if (props.lg) col.lg = props.lg

  return (
    <Grid fluid>
      <Row>
        <Col {...col} className='center-block'>
          <div className='container-transparent'>
            {props.children}
          </div>
          {props.outside}
        </Col>
      </Row>
    </Grid>
  )
}

TransparentContainerLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  outside: PropTypes.element.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number
}

export default TransparentContainerLayout
