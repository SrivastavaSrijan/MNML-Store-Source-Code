import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'react-feather';
import { userDetails, addressIcons } from 'Layouts/UserPage/userActions';
import { useSelector } from 'react-redux';
import { camelCase } from 'Services/Redux/Database/helperFunctions';
import { Fade } from 'react-reveal';

export const UserDetails = ({ emailVerified }) => {
  const [show, setShow] = useState('DET');
  const { currentUser } = useSelector((state) => state.user);
  return (
    <article className="panel is-link">
      <p className="panel-heading has-text-white">User Details</p>
      <p className="panel-tabs py-4" style={{ flexWrap: 'wrap' }}>
        {userDetails.map(({ title, href, id }) => (
          <button
            key={id}
            className={`button mt-2 is-rounded is-small has-no-bg has-text-black mr-1 ${
              show === href ? 'is-active' : ''
            }`}
            onClick={() => setShow(href)}
          >
            {title}
          </button>
        ))}
      </p>
      <Fade duration={200} spy={show}>
        <>
          {currentUser &&
            show === 'DET' &&
            Object.entries(currentUser).map(([key, values], index) =>
              key !== 'address' &&
              key !== 'createdAt' &&
              key !== 'id' &&
              key !== 'cartItems' &&
              key !== 'saveditems' ? (
                <div className="panel-block" key={key}>
                  <span className="panel-icon ">
                    <i>{addressIcons[key]}</i>
                  </span>
                  <span className="mt-2 ml-5">{values}</span>
                </div>
              ) : null,
            )}
          {currentUser &&
            show === 'ADD' &&
            currentUser.address &&
            Object.entries(currentUser.address).map(([key, values], index) => (
              <div className="panel-block" key={key}>
                <span className="panel-icon ">
                  <i>{addressIcons[key]}</i>
                </span>
                <span className="mt-2 ml-5">
                  <span className="has-text-weight-bold ml-2">{camelCase(key)} &mdash; </span>
                  {values}
                </span>
              </div>
            ))}
          {currentUser && show === 'DET' && (
            <div className="panel-block">
              <span className="panel-icon ">
                <i>{emailVerified ? <CheckCircle color="green" /> : <XCircle color="red" />}</i>
              </span>
              <span className="mt-2 ml-5">
                {' '}
                {emailVerified ? 'Email verified!' : 'Email not verified'}
              </span>
            </div>
          )}
        </>
      </Fade>
    </article>
  );
};
