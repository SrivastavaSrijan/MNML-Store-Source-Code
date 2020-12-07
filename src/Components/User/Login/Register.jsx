import React, { useState } from 'react';
import './SignIn.scss';
import { FormInput } from './FormInput';
import { Mail, User, Lock, UserPlus } from 'react-feather';
import { useFormik } from 'formik';
import { ValidateRegister } from './ValidateRegister';
import { auth, createUserProfileDocument } from '../../../Services/Firebase/firebaseAuth';
import { Fade } from 'react-reveal';

export const Register = ({ history, showLoader, hideLoader }) => {
  const [error, setStatus] = useState(null);
  const formikObject2 = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: ValidateRegister,
    onSubmit: async (values, { setSubmitting }) => {
      const { displayName, email, password } = values;
      showLoader();
      try {
        const { user } = await auth().createUserWithEmailAndPassword(email, password);
        await createUserProfileDocument(user, displayName);
        history.push('/');
      } catch (error) {
        setStatus(error);
      }
      setSubmitting(false);
      hideLoader();
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formikObject2;
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          forWhat="displayName"
          type="displayName"
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          errors={errors}
          touched={touched}
          autoComplete="name"
          isSubmitting={isSubmitting}
        >
          <User size={21} />
        </FormInput>
        <FormInput
          label="Email"
          forWhat="email"
          type="email"
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          errors={errors}
          touched={touched}
          autoComplete="email"
          isSubmitting={isSubmitting}
        >
          <Mail size={21} />
        </FormInput>
        <FormInput
          label="Set Password"
          forWhat="password"
          type="password"
          handleChange={handleChange}
          handleBlur={handleBlur}
          values={values}
          errors={errors}
          touched={touched}
          autoComplete="new-password"
          isSubmitting={isSubmitting}
        >
          <Lock size={21} />
        </FormInput>

        <div className="field">
          <p className="control is-hcentered">
            <button
              disabled={isSubmitting}
              className={`button is-primary  ml-4 " ${isSubmitting ? `is-loading` : ``}`}
              type="submit"
            >
              <span className="icon is-small">
                <i>
                  {' '}
                  <UserPlus size={20} />
                </i>
              </span>
              <span className="is-size-6 is-size-7-mobile">Register</span>
            </button>
          </p>
        </div>
        {error ? (
          <Fade top collapse duration={200}>
            <p className="content mt-2 px-6 has-text-black">
              <span className="help is-danger is-size-5 is-size-6-mobile">{error.message}</span>
            </p>
          </Fade>
        ) : null}
      </form>
    </div>
  );
};
