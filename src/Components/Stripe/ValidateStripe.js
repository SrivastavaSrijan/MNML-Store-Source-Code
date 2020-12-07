export const ValidateStripe = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 25) {
    errors.name = 'Must be 25 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  if (!values.city) {
    errors.city = 'Required';
  }

  if (!values.state) {
    errors.state = 'Required';
  }

  // if (!values.country) {
  //   errors.country = 'Required';
  // } else if (values.country.length < 6) {
  //   errors.country = 'Password is atleast 6 characters long';
  // }
  if (!values.zip) {
    errors.zip = 'Required';
  }
  return errors;
};
