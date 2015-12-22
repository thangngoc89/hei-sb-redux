import { createValidator,
          required,
          email,
          minLength,
          fixedLength } from 'redux/utils/validation'

const LoginFormValidator = createValidator({
  fullName: [required, minLength(4)],
  dayOfBirth: [required], // TODO: Enforce date validation here
  university: [required, minLength(6)],
  email: [required, email],
  code: [required, fixedLength(10)]
})

export default LoginFormValidator
