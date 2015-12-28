import LoginForm from 'components/LoginForm'
import Container from 'layouts/TransparentContainerLayout'
import HomeLink from 'components/HomeLink'

const LoginView = () => {
  return (
    <Container xs={12} sm={10} md={8} lg={6} outside={<HomeLink />}>
      <LoginForm />
    </Container>
  )
}

export default LoginView
