import React, { PropTypes } from 'react'
import { Col, Row, Grid } from 'react-bootstrap'

const TransparentContainerLayout = (props) => {
  // TODO: Refactor this
  let col = {}
  let className = 'container-transparent '

  if (props.xs) col.xs = props.xs
  if (props.sm) col.sm = props.sm
  if (props.md) col.md = props.md
  if (props.lg) col.lg = props.lg

  if (props.colClassName) className += props.colClassName

  return (
    <Grid fluid>
      <Row>
        <Col {...col} className='center-block'>
          <div className={className}>
            {props.children}
          </div>
          {props.outside}
        </Col>
      </Row>
    </Grid>
  )
}

TransparentContainerLayout.propTypes = {
  children: PropTypes.element.isRequired,
  outside: PropTypes.element.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  colClassName: PropTypes.string
}

export default TransparentContainerLayout
