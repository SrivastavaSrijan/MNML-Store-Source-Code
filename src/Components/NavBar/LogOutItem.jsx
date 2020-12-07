import React, { useContext } from 'react';
import './NavBar.scss';
// import { items } from './NavbarFunctions';
import { Link } from 'react-router-dom';
import { GlobalContext } from 'index';
import { auth } from '../../Services/Firebase/firebaseAuth';
import { LogOut } from 'react-feather';

export const LogOutItem = ({ title, href, id, currentLocation }) => {
  // eslint-disable-next-line
  const { setDelay, showLoader, hideLoader } = useContext(GlobalContext);
  return (
    <li>
      <Link
        onClick={async () => {
          showLoader();
          await setDelay(100, 1000);
          auth().signOut();
          hideLoader();
        }}
        key={id}
        className={` menu-item mr-2 is-size-4 is-size-5-mobile ${
          currentLocation === '/' ? 'has-text-white' : 'has-text-black'
        }`}
        to={href}
      >
        <span className="icon">
          <LogOut />
        </span>
        <span
          className={`ml-2 is-size-7 ${
            currentLocation === '/' ? 'has-text-white' : 'has-text-black'
          }`}
        >
          {title}
        </span>
      </Link>
    </li>
  );
};
