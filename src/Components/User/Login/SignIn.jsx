import React, { useState } from 'react';
import './SignIn.scss';
import { FormInput } from './FormInput';
import { Mail, Lock, LogIn } from 'react-feather';
import { useFormik } from 'formik';
import { ValidateSignIn } from './ValidateSignIn';
import { auth, signInWithGoogle } from '../../../Services/Firebase/firebaseAuth';
import Google from '../../../Assets/Media/google.webp';
import { Image } from '../../Image/Image';
import { Fade } from 'react-reveal';

export const SignIn = ({ history, showLoader, hideLoader }) => {
  const [error, setStatus] = useState(null);

  const formikObject1 = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: ValidateSignIn,
    onSubmit: async (values, { setSubmitting }) => {
      const { email, password } = values;
      showLoader();
      try {
        await auth().signInWithEmailAndPassword(email, password);
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
  } = formikObject1;
  return (
    <div className="is-vcentered is-hcentered">
      <form onSubmit={handleSubmit}>
        <FormInput
          errors={errors}
          forWhat="email"
          handleBlur={handleBlur}
          handleChange={handleChange}
          label="Registered Email ID"
          touched={touched}
          type="email"
          values={values}
          autoComplete="email"
          isSubmitting={isSubmitting}
        >
          <Mail size={21} />
        </FormInput>
        <FormInput
          errors={errors}
          forWhat="password"
          handleBlur={handleBlur}
          handleChange={handleChange}
          label="Password"
          touched={touched}
          type="password"
          values={values}
          autoComplete="current-password"
          isSubmitting={isSubmitting}
        >
          <Lock size={21} />
        </FormInput>

        <div className="field">
          <div className="control is-hcentered is-vcentered">
            <button
              className={`button  is-primary mx-2  my-3 ${isSubmitting ? `is-loading` : ``}`}
              disabled={isSubmitting}
              type="submit"
            >
              <span className="icon is-small">
                <i>
                  <LogIn size={20} />
                </i>
              </span>
              <span className="is-size-6 is-size-7-mobile">Login</span>
            </button>
            <button
              disabled={isSubmitting}
              className={`button is-outlined  mx-2 my-3 " ${isSubmitting ? `is-loading` : ``}`}
              type="button"
              onClick={async () => {
                showLoader();
                await signInWithGoogle();
                history.push('/');
                hideLoader();
              }}
              style={{ alignItems: 'center' }}
            >
              {!isSubmitting ? (
                <>
                  <span className="icon is-small">
                    <Image img={Google} is="24x24" />
                  </span>
                  <span className="">Sign In with Google</span>
                </>
              ) : null}
            </button>
          </div>
        </div>
      </form>
      {error ? (
        <Fade bottom collapse duration={300}>
          <p className="content mt-2 px-6 has-text-black">
            <span className="help is-danger is-size-5 is-size-6-mobile">{error.message}</span>
          </p>
        </Fade>
      ) : null}
    </div>
  );
};
