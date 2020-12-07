import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../Assets/Media/logo.png';
import { Link } from 'react-router-dom';

export const NavbarBrand = () => {
  const { currentLocation } = useSelector((state) => state.location);

  return (
    <nav
      aria-label="main navigation"
      className={`navbar pt-2 ${currentLocation === '/' ? 'is-transparent' : 'is-muted-link'}`}
      role="navigation"
    >
      <div className="container is-fluid is-hcentered">
        <div className="navbar-brand-modified">
          <Link className="has-text-black is-size-7-mobile has-text-weight-semibold" to="/">
            <div className="navbar-item">
              <img alt="MNML logo" src={logo} />
              <p
                className={`title is-size-4 is-size-6-mobile  ${
                  currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                }`}
              >
                MNML
              </p>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
