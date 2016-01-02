import 'styles/global.loader'
import NavBar from 'components/NavBar'
import Footer from 'components/Footer'

const CoreLayout = ({ children, location }) => {
  return (
    <div>
      <NavBar location={location}/>
      {children}
      <Footer />
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
}

export default CoreLayout
