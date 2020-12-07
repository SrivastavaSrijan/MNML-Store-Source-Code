import React, { useState, useEffect } from 'react';
//import { UserDetails } from '../../Components/User/Details/UserDetails';
import { Image } from '../../Components/Image/Image';
import { useSelector } from 'react-redux';
import { UserMenu } from './UserMenu';
import { UserEditDetails } from 'Components/User/Details/UserEditDetails';
import { Fade } from 'react-reveal';
const UserPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { displayName } = currentUser ? currentUser : 'undefined';
  const { currentLocation } = useSelector((state) => state.location);
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
    setSuccess(false);
  }, [currentLocation]);
  const [success, setSuccess] = useState(false);
  return (
    <div className="columns is-marginless">
      <div className="column is-5 is-paddingless">
        <article className="message is-link">
          <div className="is-flex is-vcentered message-header has-text-black px-3">
            <Image
              is="32x32"
              img={`https://ui-avatars.com/api/?format=svg&name=${displayName}&background=FFF&rounded=true`}
            />
            <p className="has-text-white is-size-6 is-size-7-mobile">{displayName}</p>
          </div>
          <div className="message-body">
            <div className="media">
              <div className="media-content">
                <h2 className="subtitle is-size-6 is-size-7-mobile has-text-black">
                  Account Details
                </h2>
                <h1 className="title is-size-2 is-size-3-mobile">Welcome!</h1>
              </div>
            </div>
          </div>
          <UserMenu currentLocation={currentLocation} />
        </article>
      </div>

      <div className="column is-6">
        <UserEditDetails setSuccess={setSuccess} setError={setError}>
          {error ? (
            <Fade bottom collapse duration={300}>
              <p className="help is-danger is-size-5 is-size-6-mobile">{error.message}</p>
            </Fade>
          ) : success ? (
            <Fade bottom collapse duration={300}>
              <p className="help has-text-warning is-size-5 is-size-6-mobile">{success}</p>
            </Fade>
          ) : null}
        </UserEditDetails>
      </div>
    </div>
  );
};
export default UserPage;
