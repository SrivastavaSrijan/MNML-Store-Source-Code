export const ValidateDetails = (values) => {
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

  if (!values.zip) {
    errors.zip = 'Required';
  }
  return errors;
};
export const ValidateEmail = (values) => {
  const errors = {};

  if (!values.newEmail) {
    errors.newEmail = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.newEmail)) {
    errors.newEmail = 'Invalid email address';
  }

  return errors;
};
