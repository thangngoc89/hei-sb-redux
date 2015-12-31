import { PropTypes } from 'react'
import { Col, Row, Grid } from 'react-bootstrap'

const MaterialBox = (props) => {
  // TODO: Refactor this
  let col = {}
  if (props.xs) col.xs = props.xs
  if (props.sm) col.sm = props.sm
  if (props.md) col.md = props.md
  if (props.lg) col.lg = props.lg

  const fluid = (props.fluid === undefined || props.fluid)

  return (
    <Grid fluid={fluid}>
      <Row>
        <Col {...col} className='center-block'>
          <div className='material-box'>
            {props.children}
          </div>
          {props.outside}
        </Col>
      </Row>
    </Grid>
  )
}

MaterialBox.propTypes = {
  children: PropTypes.element.isRequired,
  outside: PropTypes.element,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  fluid: PropTypes.bool
}

export default MaterialBox
