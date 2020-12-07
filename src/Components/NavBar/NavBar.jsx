import React, { useEffect, useState } from 'react';
import logo from '../../Assets/Media/logo.png';
import './NavBar.scss';
// import { items } from './NavbarFunctions';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, Target } from 'react-feather';
import { sections, anonPages, userPages, collections } from './NavbarFunctions';
import { setCurrentLocation } from '../../Services/Redux/Location/locationActions';
import { bubble as NavMenu } from 'react-burger-menu';
import { NavItem } from './NavItem';
import { LogOutItem } from './LogOutItem';

const NavBar = () => {
  // eslint-disable-next-line
  const { currentUser } = useSelector((state) => state.user);
  const { totalItemsInCart } = useSelector((state) => state.cart);
  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };
  const location = useLocation();
  const dispatch = useDispatch();
  const currentLocation = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    dispatch(setCurrentLocation(currentLocation));
  }, [currentLocation, dispatch]);
  return (
    <NavMenu
      isOpen={menuOpen}
      onStateChange={(state) => handleStateChange(state)}
      right
      morphShapeClassName={` ${currentLocation === '/' ? 'bm-morph-hero' : 'bm-morph-else'}`}
      customBurgerIcon={
        <div className={` ${currentLocation === '/' ? 'bm-background' : 'is-muted-link low-h'}`}>
          <span className="icon is-large mt-2">
            <i>
              <Menu size={25} color={`${currentLocation === '/' ? 'white' : 'black'}`} />
            </i>
          </span>
        </div>
      }
      disableAutoFocus
      menuClassName={`menu ${currentLocation === '/' ? '' : 'is-muted-link'}`}
      pageWrapId={'page-wrap'}
      outerContainerId={'root'}
      customCrossIcon={<X size={25} />}
    >
      <ul className="menu-list" onClick={() => setMenuOpen(false)}>
        <Link className="menu-item has-text-black is-size-7-mobile has-text-weight-semibold" to="/">
          <div className="">
            <picture style={{ overflow: 'hidden' }}>
              <img alt="MNML logo" src={logo} width="128" height="128" />
            </picture>
            <p
              className={`title is-size-4 is-size-6-mobile  ${
                currentLocation === '/' ? 'has-text-white' : 'has-text-black'
              }`}
            >
              MNML
            </p>
          </div>
        </Link>
        <p
          className={`menu-label ${currentLocation === '/' ? 'has-text-white' : 'has-text-black'}`}
        >
          Collections
        </p>
        {collections.map(({ title, href, icon, id }) => (
          <NavItem
            title={title}
            href={href}
            icon={icon}
            key={id}
            totalItemsInCart={totalItemsInCart}
          />
        ))}{' '}
        <NavItem title="Features" exact href="/Collections" icon={<Target />} />
        <p
          className={`menu-label ${currentLocation === '/' ? 'has-text-white' : 'has-text-black'}`}
        >
          User
        </p>
        {sections.map(({ title, href, icon, id }) => (
          <NavItem
            title={title}
            href={href}
            icon={icon}
            key={id}
            totalItemsInCart={totalItemsInCart}
          />
        ))}{' '}
        {currentUser === null
          ? anonPages.map(({ title, href, icon, id }) => (
              <>
                <NavItem title={title} href={href} icon={icon} key={id} />
              </>
            ))
          : userPages.map(({ title, href, icon, id }) => (
              <>
                <NavItem
                  title={title}
                  href={href}
                  icon={icon}
                  key={id}
                  userName={currentUser.displayName}
                />
                <LogOutItem key={12} title="Log Out" href="/" currentLocation={currentLocation} />
              </>
            ))}
      </ul>
    </NavMenu>
  );
};
export default NavBar;
