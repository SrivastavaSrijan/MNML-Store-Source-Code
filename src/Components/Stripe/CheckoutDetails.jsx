import React, { useState, useContext } from 'react';
import { FormInput } from '../User/Login/FormInput';
import { useFormik } from 'formik';
import { ValidateStripe } from './ValidateStripe';
import { Fade } from 'react-reveal';
import { formInputs } from '../../Services/Stripe/stripeUtils';
import { setLoading } from 'Services/Redux/General/generalActions';
import { GlobalContext } from 'index';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowRight, Save } from 'react-feather';

export const CheckoutDetails = ({ setShowCard, setValues, userSavedValues, setShowSaved }) => {
  const [error, setStatus] = useState(null);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.general);

  const { setDelay } = useContext(GlobalContext);
  const formikObject3 = useFormik({
    initialValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
    },

    validate: ValidateStripe,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        dispatch(setLoading(true));
        await setDelay(200, 750);
        setValues(values);
        setSubmitting(false);
        dispatch(setLoading(false));
        await setShowCard(true);
      } catch (error) {
        setStatus(error);
        setSubmitting(false);
      }
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
  } = formikObject3;
  return (
    <div>
      {userSavedValues ? (
        <button
          className="button ml-2 my-4 is-success is-light is-rounded"
          onClick={() => setShowSaved(true)}
        >
          <span className="icon is-small">
            <i>
              <Save size={20} />
            </i>
          </span>
          <span className="is-size-6 is-size-7-mobile">Saved Addresses</span>
        </button>
      ) : null}
      <form onSubmit={handleSubmit}>
        {formInputs.map(({ forWhat, label, type, autoComplete, icon }) => {
          return (
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
          );
        })}

        <div className="field my-6">
          <p className="control is-hcentered">
            <button
              className={`button is-fullwidth is-medium is-primary " ${
                isLoading ? `is-loading` : ``
              }`}
              disabled={isLoading || isSubmitting}
              type="submit"
            >
              <span>Proceed</span>
              <span className="icon is-small">
                <ArrowRight />
              </span>
            </button>
          </p>
        </div>
      </form>

      {error ? (
        <Fade duration={300} bottom collapse>
          <p className="content mt-2 has-text-black">
            <span className="help is-danger">{error.message}</span>
          </p>
        </Fade>
      ) : null}
    </div>
  );
};
