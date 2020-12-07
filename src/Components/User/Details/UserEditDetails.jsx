import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserForm } from './UserForm';
import { Route, Switch } from 'react-router-dom';
import { setLoading } from 'Services/Redux/General/generalActions';
import { GlobalContext } from 'index';
import { AnimatedSwitch } from 'react-router-transition';
import { slideUpTrans, slideUp } from 'Layouts/HomePage/routerTransitions';
import { Title } from 'Components/Title/Title';
import { userActions } from 'Layouts/UserPage/userActions';
import { UserDetails } from './UserDetails';
import { Page404 } from 'Layouts/HomePage/Page404';
export const UserEditDetails = ({ setSuccess, setError, children }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.general);
  const { setDelay, auth, hideLoader, showLoader } = useContext(GlobalContext);
  //const { currentUser } = useSelector((state) => state.user);
  const currentUserObject = auth().currentUser;
  const { emailVerified, email } =
    currentUserObject !== null ? currentUserObject : { email: '', emailVerified: false };
  //const { displayName } = currentUser !== null ? currentUser : { email: '', emailVerified: false };
  const getMethod = async (id) => {
    switch (id) {
      case 1:
        auth()
          .sendPasswordResetEmail(email)
          .then((response) => {
            const message =
              response === undefined
                ? `An email to reset your password has been sent to
              ${email}. Please follow the instructions to change your password`
                : response.message;
            setSuccess(message);
          })
          .catch((error) => {
            setError(error);
          });
        break;
      case 2:
        currentUserObject
          .sendEmailVerification()
          .then((response) => {
            const message = response === undefined ? 'Email sent successfully!' : response.message;
            setSuccess(message);
          })
          .catch((error) => {
            setError(error);
          });
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Switch>
        <AnimatedSwitch {...slideUpTrans} className="switch-wrapper" mapStyles={slideUp}>
          <Route exact path="/User">
            <UserDetails auth={auth} emailVerified={emailVerified} />
          </Route>
          {userActions.map(({ href, title, subtitle, id, buttonText, icon }) => (
            <Route exact path={href} key={id}>
              <div>
                <Title title={title} subtitle={subtitle}>
                  {id === 1 || id === 2 ? (
                    id === 2 && emailVerified ? (
                      <p className="has-text-black ml-4 is-size-5 is-size-6-mobile">
                        Your email is already verified!
                      </p>
                    ) : (
                      <div>
                        <button
                          disabled={isLoading}
                          className={`button  is-success is-fullwidth is-medium  is-light mt-2 is-vcentered has-text-white" ${
                            isLoading ? `is-loading` : ``
                          }`}
                          onClick={async () => {
                            dispatch(setLoading(true));
                            await setDelay(200, 750);
                            getMethod(id);
                            dispatch(setLoading(false));
                          }}
                        >
                          <span className="icon is-small">
                            <i>{icon}</i>
                          </span>
                          <span className="is-size-6 is-size-7-mobile">{buttonText}</span>
                        </button>
                        <div className="content px-6 mt-4">{children}</div>
                      </div>
                    )
                  ) : (
                    <UserForm
                      id={id}
                      buttonText={buttonText}
                      auth={auth}
                      setSuccess={setSuccess}
                      setError={setError}
                      showLoader={showLoader}
                      hideLoader={hideLoader}
                    >
                      <div className="content px-6 mt-4">{children}</div>
                    </UserForm>
                  )}
                </Title>
              </div>
            </Route>
          ))}
          <Route exact>
            <section className="section  mt-2">
              <Page404 />
            </section>
          </Route>
        </AnimatedSwitch>
      </Switch>
    </div>
  );
};
