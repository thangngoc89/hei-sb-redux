import Container from 'layouts/TransparentContainerLayout'
import HomeLink from 'components/HomeLink'

const NotFound = () => {
  return (
    <Container sm={12} md={5} outside={<HomeLink />}>
      <div>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    </Container>
  )
}

export default NotFound
