import React from 'react';
import { AlertCircle } from 'react-feather';
import { Fade, Slide } from 'react-reveal';

export const FormInput = ({
  label,
  forWhat,
  type,
  autoComplete,
  children,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  isSubmitting,
}) => {
  return (
    <div className="field mb-4 px-5 ">
      <div className={`control has-icons-left has-icons-right ${isSubmitting ? 'is-loading' : ''}`}>
        <input
          className={`input ${errors[forWhat] && touched[forWhat] ? 'is-danger' : ''}`}
          id={forWhat}
          name={type}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={label}
          type={type}
          values={values[forWhat]}
          autoComplete={autoComplete}
        />
        {/* <label className="label is-size-7" htmlFor={forWhat}>
          {label}
        </label> */}
        <span className="icon is-small is-left">
          <Slide duration={200} left>
            <i>{children}</i>
          </Slide>
        </span>
        {errors[forWhat] && touched[forWhat] ? (
          <span className="icon is-small is-right">
            <Slide right>
              <AlertCircle duration={200} color="#E65F61" />
            </Slide>
          </span>
        ) : null}
      </div>
      {errors[forWhat] && touched[forWhat] ? (
        <Fade bottom collapse duration={300}>
          <p className="help is-danger is-size-7">{errors[forWhat]}</p>
        </Fade>
      ) : null}
    </div>
  );
};
