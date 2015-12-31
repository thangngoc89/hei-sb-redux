import { Link } from 'react-router'
import styles from './style.scss'
import classnames from 'classnames'
import CSSModules from 'react-css-modules'

const NavItem = ({ path, currentPath, children }) => {
  const liClass = classnames({
    'nav-item': true,
    [styles['nav-item']]: true,
    [styles['active']]: path === currentPath
  })

  return (
    <li className={liClass}>
      <Link to={path}>
        {children}
      </Link>
    </li>
  )
}

const NavBar = ({ location }) => {
  const { pathname } = location

  return (
    <nav className='navbar navbar-fixed-top' styleName='nav'>
      <ul className='nav navbar-nav'>
        <NavItem path='/' currentPath={pathname}>
          <i className='fa fa-home'/> home
        </NavItem>
        <NavItem path='/leaderboard' currentPath={pathname}>
          leaderboard
        </NavItem>
        <li className='nav-item pull-xs-right' styleName='nav-item'>
          <a
            target='_blank'
            href='//fb.me/engclubhei'
          >
            <i className='fa fa-facebook'/>
            <span className='hidden-xs-down'>
              &nbsp;visit our fanpage
            </span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

NavBar.propTypes = {
  location: React.PropTypes.object
}

export default CSSModules(NavBar, styles)
