import { Link } from 'react-router'
import styles from './style.scss'
import CSSModules from 'react-css-modules'

class NavBar extends React.Component {
  render () {
    return (
      <nav className='navbar navbar-light' styleName='nav'>
        <ul className='nav navbar-nav'>
          <li className='nav-item'>
            <Link to='/' styleName='nav-link'>
              <i className='fa fa-home'/> home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/leaderboard' styleName='nav-link'>leaderboard</Link>
          </li>
          <li className='nav-item pull-xs-right'>
            <a
              styleName='nav-link'
              target='_blank'
              href='//fb.me/engclubhei'
            >
              <i className='fa fa-facebook'/> visit our fanpage
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default CSSModules(NavBar, styles)
