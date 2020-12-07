import React from 'react';
import { Mail, Edit3 } from 'react-feather';
import { useFormik } from 'formik';
import { FormInput } from '../Login/FormInput';
import { ValidateDetails, ValidateEmail } from './ValidateDetails';
import { updateUserInformation } from 'Services/Firebase/firebaseAuth';
import { formInputs } from '../../../Services/Stripe/stripeUtils';

export const UserForm = ({
  buttonText,
  id,
  setSuccess,
  setError,
  auth,
  children,
  showLoader,
  hideLoader,
}) => {
  const formikObjectDetails = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    },
    validate: ValidateDetails,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      showLoader();
      const [message, isSuccess] = await updateUserInformation(auth().currentUser, {
        displayName: values.name,
        address: values,
      });
      message === undefined && isSuccess
        ? setSuccess('Successfully updated details.')
        : setError('Error updated details!');

      message !== undefined && isSuccess ? setSuccess(message) : setError(message);
      hideLoader();
      setSubmitting(false);
    },
  });
  const formikObjectEmail = useFormik({
    initialValues: {
      newEmail: '',
    },
    validate: ValidateEmail,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      let user = auth().currentUser;
      showLoader();
      await user
        .updateEmail(values.newEmail)
        .then((response) => {
          const message = response === undefined ? 'Email successfully changed.' : response.message;
          setSuccess(message);
        })
        .catch((error) => {
          setError(error);
        });
      hideLoader();
      setSubmitting(false);
    },
  });
  const formikObject = id === 3 ? formikObjectEmail : formikObjectDetails;
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formikObject;
  return (
    <div className="is-vcentered is-hcentered">
      <form onSubmit={handleSubmit}>
        {id === 3 ? (
          <FormInput
            errors={errors}
            forWhat="newEmail"
            handleBlur={handleBlur}
            handleChange={handleChange}
            label="New Email"
            touched={touched}
            type="newEmail"
            values={values}
            autoComplete="new-email"
            isSubmitting={isSubmitting}
          >
            <Mail size={21} />
          </FormInput>
        ) : (
          formInputs.map(({ forWhat, label, type, autoComplete, icon }) => (
            <FormInput
              key={forWhat}
              errors={errors}
              forWhat={forWhat}
              handleBlur={handleBlur}
              handleChange={handleChange}
              label={label}
              touched={touched}
              type={type}
              values={values}
              autoComplete={autoComplete}
              isSubmitting={isSubmitting}
            >
              {icon}
            </FormInput>
          ))
        )}
        }
        <div className="field">
          <div className="control is-hcentered is-vcentered">
            <button
              className={`button  is-success is-light is-fullwidth ${
                isSubmitting ? `is-loading` : ``
              }`}
              disabled={isSubmitting}
              type="submit"
            >
              <span className="icon is-small">
                <i>
                  <Edit3 size={20} />
                </i>
              </span>
              <span className="is-size-6 is-size-7-mobile">{buttonText}</span>
            </button>
          </div>
          {children}
        </div>
      </form>
    </div>
  );
};
