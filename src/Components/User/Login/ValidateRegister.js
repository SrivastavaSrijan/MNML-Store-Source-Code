export const ValidateRegister = (values) => {
  const errors = {};
  if (!values.displayName) {
    errors.displayName = 'Required';
  } else if (values.displayName.length > 25) {
    errors.displayName = 'Must be 25 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  const passwordRegex = /(?=.*[0-9])/;
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password is atleast 6 characters long';
  } else if (!passwordRegex.test(values.password)) {
    errors.password = 'Add a number to your password';
  }

  return errors;
};
