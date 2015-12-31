import 'styles/global.loader'
import NavBar from 'components/NavBar'

const CoreLayout = ({ children, location }) => {
  return (
    <div>
      <NavBar location={location}/>
      {children}

      <footer className='footer'>
        <div className='container'>
          <p className='text-muted'>
            Handcrafted with <i className='fa fa-heart'/> by <a href='http://khoanguyen.me' target='_blank'>Khoa Nguyen</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
}

export default CoreLayout
