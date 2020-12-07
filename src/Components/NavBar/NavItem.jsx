import React from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
export const NavItem = ({ title, icon, href, id, totalItemsInCart, userName, exact }) => {
  const { currentLocation } = useSelector((state) => state.location);
  // eslint-disable-next-line
  const test = exact ? currentLocation === href : currentLocation.includes(href);
  return (
    <li className={`is-${test ? 'active' : 'inactive'} `}>
      <Link
        key={id}
        className={`menu-item is-${
          test ? 'active is-tab is-expanded' : 'inactive'
        } mr-2 is-size-4 is-size-5-mobile ${
          currentLocation === '/' ? 'has-text-white' : 'has-text-black'
        }`}
        style={{ textDecoration: 'none' }}
        to={href}
      >
        <span className="icon">{icon}</span>
        <span
          className={`ml-2 is-size-7 ${
            currentLocation === '/' ? 'has-text-white' : 'has-text-black'
          }`}
        >
          {title === 'Cart'
            ? `${title} (${totalItemsInCart} items)`
            : title === 'User'
            ? `${userName}`
            : title}
        </span>
      </Link>
    </li>
  );
};
