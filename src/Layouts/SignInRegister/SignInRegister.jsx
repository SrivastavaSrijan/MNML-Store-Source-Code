import React, { useState, useEffect, useContext } from 'react';
import { SignIn } from '../../Components/User/Login/SignIn';
import { Register } from '../../Components/User/Login/Register';
import { Title } from '../../Components/Title/Title';
import { useHistory } from 'react-router-dom';
import { Fade } from 'react-reveal';
import { GlobalContext } from 'index';
const SignInRegister = () => {
  const { showLoader, hideLoader } = useContext(GlobalContext);
  const [toRegister, setFormState] = useState();
  const history = useHistory();
  useEffect(() => {
    if (toRegister) {
      setFormState(true);
    } else {
      setFormState(false);
    }
  }, [toRegister, setFormState]);

  return (
    <div className="container is-fluid fit-desktop" style={{ width: '50%' }}>
      <Fade spy={toRegister} duration={500}>
        {!toRegister ? (
          <Title subtitle="I already have an account" title="Sign In.">
            <div className="is-flex is-vcentered has-text-black px-3 mb-2">
              <p className="mt-4 has-text-black">
                Don&rsquo;t have an account?
                <br />
                <span
                  className="has-text-info-dark has-text-weight-bold is-hyperlink"
                  onClick={() => setFormState(true)}
                >
                  Register here.
                </span>
              </p>
            </div>
            <SignIn history={history} showLoader={showLoader} hideLoader={hideLoader} />
            <p className="content mt-4 has-text-black is-size-7 px-4">
              By signing up and using our services, you agree with our{' '}
              <a
                href="https://mnml.srijansrivastava.tech/TOS.html"
                className="has-text-info-dark has-text-weight-bold is-hyperlink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions{' '}
              </a>
              and
              <a
                href="https://mnml.srijansrivastava.tech/PrivacyPolicy.html"
                className="has-text-info-dark has-text-weight-bold is-hyperlink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Privacy Policy
              </a>
            </p>
          </Title>
        ) : (
          <Title subtitle="I don't have an account" title="Register.">
            <div className="is-flex is-vcentered has-text-black px-3 mb-2">
              <p
                className="
                mt-4 has-text-black"
              >
                Already have an account?
                <br />
                <span
                  className="has-text-info-dark has-text-weight-bold is-hyperlink"
                  onClick={() => setFormState(false)}
                >
                  Sign in here.
                </span>
              </p>
            </div>
            <Register history={history} showLoader={showLoader} hideLoader={hideLoader} />
            <p className="content mt-4 has-text-black is-size-7 px-4">
              By signing up and using our services, you agree with our{' '}
              <a
                href="https://mnml.srijansrivastava.tech/TOS.html"
                className="has-text-info-dark has-text-weight-bold is-hyperlink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions{' '}
              </a>
              and
              <a
                href="https://mnml.srijansrivastava.tech/PrivacyPolicy.html"
                className="has-text-info-dark has-text-weight-bold is-hyperlink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Privacy Policy
              </a>
            </p>
          </Title>
        )}
      </Fade>
    </div>
  );
};
export default SignInRegister;
