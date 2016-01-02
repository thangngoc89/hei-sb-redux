import { PropTypes } from 'react'
import has from 'lodash/object/has'

const MaterialBox = (props) => {
  // Calculating proper col size
  let col = 'center-block '
  const size = ['xs', 'sm', 'md', 'lg']
  for (let i = 0; i < size.length; i++) {
    if (has(props, size[i])) {
      col += `col-${size[i]}-${props[size[i]]} ` // ex: 'col-xs-12 '
    }
  }

  const containerClass = (props.fluid === undefined) ? 'container' : 'container-fluid'

  return (
    <div className={containerClass}>
      <div className='row'>
        <div className={col}>
          <div className='material-box'>
            {props.children}
          </div>
          {props.outside}
        </div>
      </div>
    </div>
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
