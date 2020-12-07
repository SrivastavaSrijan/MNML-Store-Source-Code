import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, ShoppingCart, User, LogOut } from 'react-feather';
import { auth } from '../../Services/Firebase/firebaseAuth';

export const ListItem = ({ location, href, title, displayName, length }) => {
  return (
    <li
      onClick={() => (title === 'Log Out' ? auth().signOut() : null)}
      className={`is-${location === href ? 'active' : 'inactive'} mr-2 is-size-6 is-size-7-mobile`}
    >
      <Link className="has-text-black is-size-7-mobile has-text-weight-semibold" to={href}>
        {title === 'Cart' ? (
          <span>
            <ShoppingCart color={location === '/' ? 'white' : 'black'} />
            <span
              className={`ml-2 is-size-7 ${location === '/' ? 'has-text-white' : 'has-text-black'}`}
            >
              {length}
            </span>
          </span>
        ) : title === 'Login/Sign Up' ? (
          <span>
            <LogIn color={location === '/' ? 'white' : 'black'} />
            <span
              className={`ml-2 is-size-7 ${location === '/' ? 'has-text-white' : 'has-text-black'}`}
            >
              {title}
            </span>
          </span>
        ) : title === 'Log Out' ? (
          <span>
            <LogOut color={location === '/' ? 'white' : 'black'} />
            <span
              className={`ml-2 is-size-7 ${location === '/' ? 'has-text-white' : 'has-text-black'}`}
            >
              {title}
            </span>
          </span>
        ) : title === 'User' ? (
          <span>
            <User color={location === '/' ? 'white' : 'black'} />
            <span
              className={`ml-2 mb-2 is-size-7 ${
                location === '/' ? 'has-text-white' : 'has-text-black'
              }`}
            >
              {displayName}
            </span>
          </span>
        ) : null}
      </Link>
    </li>
  );
};
