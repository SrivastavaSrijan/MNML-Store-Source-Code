import React, { useEffect, useContext, useState } from 'react';
import logo from '../../Assets/Media/logo.png';
import './NavBar.scss';
// import { items } from './NavbarFunctions';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogIn, User, LogOut, ShoppingCart } from 'react-feather';
import { GlobalContext } from 'index';
import { sections } from './NavbarFunctions';
import { auth } from '../../Services/Firebase/firebaseAuth';
import { setCurrentLocation } from '../../Services/Redux/Location/locationActions';
import { slide as Menu } from 'react-burger-menu';
import { decorator as reduxBurgerMenu } from 'redux-burger-menu';

const NavBar = () => {
  // eslint-disable-next-line
  const { currentUser } = useSelector((state) => state.user);
  const { setDelay, showLoader, hideLoader } = useContext(GlobalContext);
  const { totalItemsInCart } = useSelector((state) => state.cart);

  const location = useLocation();
  const [clickedBurger, isClicked] = useState(false);
  const [clickedDropdown, isClickedDrop] = useState(false);
  const dispatch = useDispatch();
  const currentLocation = location.pathname;
  useEffect(() => {
    dispatch(setCurrentLocation(currentLocation));
  }, [currentLocation, dispatch]);

  return (
    <Menu>
      <nav
        aria-label="main navigation"
        className={`navbar ${currentLocation === '/' ? 'is-transparent' : 'is-muted-link'}`}
        role="navigation"
      >
        <div className="container is-fluid">
          <div className="navbar-brand">
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
            <div
              className={`${clickedBurger ? 'is-active' : ''} navbar-burger burger`}
              data-target="navMenu"
              onClick={() => isClicked(!clickedBurger)}
            >
              <span aria-hidden="true" />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className={`${clickedBurger ? 'is-active' : ''} navbar-menu`}>
            <div className="navbar-end">
              {sections.map(({ title, href, icon, id }) => {
                return (
                  <Link
                    key={id}
                    className={`navbar-item is-${
                      currentLocation.includes(href) ? 'active is-tab is-expanded' : 'inactive'
                    } mr-2 is-size-6 is-size-7-mobile ${
                      currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                    }`}
                    to={href}
                  >
                    {icon}
                    <span
                      className={`ml-2 is-size-7 ${
                        currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                      }`}
                    >
                      {title}
                    </span>
                  </Link>
                );
              })}{' '}
              <Link
                className={`navbar-item is-${
                  currentLocation === '/Cart' ? 'active is-tab' : 'inactive'
                } mr-2 is-size-6 is-size-7-mobile ${
                  currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                }`}
                to="/Cart"
              >
                <ShoppingCart color={currentLocation === '/' ? 'white' : 'black'} />

                <span
                  className={`ml-2 is-size-7 ${
                    currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                  }`}
                >
                  Cart ({totalItemsInCart} items)
                </span>
              </Link>
              {currentUser === null ? (
                <Link
                  to="/UserPage"
                  className={`navbar-item is-${
                    currentLocation === '/UserPage' ? 'active is-tab' : 'inactive'
                  } mr-2 is-size-6 is-size-7-mobile ${
                    currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                  }`}
                >
                  <span>
                    <LogIn color={currentLocation === '/' ? 'white' : 'black'} />
                    <span
                      className={`ml-2 is-size-7 ${
                        currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                      }`}
                    >
                      {' '}
                      Login/Register
                    </span>
                  </span>
                </Link>
              ) : (
                <div
                  className={`navbar-item dropdown ${
                    clickedDropdown ? 'is-active' : 'is-inactive'
                  }`}
                >
                  <div className="dropdown-trigger" onClick={() => isClickedDrop(!clickedDropdown)}>
                    <span className="navbar-link">
                      <User color={currentLocation === '/' ? 'white' : 'black'} />
                      <span
                        className={`ml-2 is-size-7 ${
                          currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                        }`}
                      >
                        {currentUser.displayName}
                      </span>
                    </span>
                    <div id="dropdown-menu3" role="menu" className="navbar-dropdown dropdown-menu">
                      <div className="dropdown-content">
                        <Link
                          className={`dropdown-item is-${
                            currentLocation === '/User' ? 'active is-tab' : 'inactive'
                          } mr-2 is-size-6 is-size-7-mobile ${
                            currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                          }`}
                          to="/User"
                        >
                          <span>
                            <User color={currentLocation === '/' ? 'white' : 'black'} />
                            <span
                              className={`ml-2 mb-2 is-size-7 ${
                                currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                              }`}
                            >
                              My profile
                            </span>
                          </span>
                        </Link>
                        <Link
                          className="dropdown-item mr-2 is-size-6 is-size-7-mobile"
                          to="/"
                          onClick={async () => {
                            showLoader();
                            await setDelay(100, 1000);
                            auth().signOut();
                            hideLoader();
                          }}
                        >
                          <span>
                            <LogOut color={currentLocation === '/' ? 'white' : 'black'} />
                            <span
                              className={`ml-2 is-size-7 ${
                                currentLocation === '/' ? 'has-text-white' : 'has-text-black'
                              }`}
                            >
                              Log Out
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </Menu>
  );
};
export default reduxBurgerMenu(NavBar);
