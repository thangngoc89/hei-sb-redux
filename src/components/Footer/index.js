import logos from './style.scss'
import Tooltip from 'react-tooltip'
import sponsorsList from './sponsorsList'

const Logo = ({name, cssClass, link}) => {
  let object = <span data-tip data-for={cssClass} className={logos[cssClass]} />
  if (link) {
    object = <a href={link} target='_blank' data-tip data-for={cssClass} className={logos[cssClass]} />
  }
  return (
    <div key={cssClass} className={logos.div}>
      {object}
      <Tooltip id={cssClass}>
        <span>{name}</span>
      </Tooltip>
    </div>
  )
}

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <p className='text-muted center-block'>
          Sponsored by
        </p>
        <div className='row'>
          <div className='col-sm-12'>
            {sponsorsList.map(Logo)}
          </div>
        </div>
        <p className='text-muted'>
          Handcrafted with <i className='fa fa-heart' style={{color: '#F00'}} />
          &nbsp;by <a href='http://khoanguyen.me' target='_blank'>Khoa Nguyen</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
