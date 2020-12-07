import React, { useEffect, lazy, Suspense } from 'react';
import NavBar from '../../Components/NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';
import { HeroBody } from '../../Components/HeroComp/HeroBody';
import { Page404 } from './Page404';
import Headroom from 'react-headroom';
import Cover from 'react-video-cover';
import vid from '../../Assets/Media/video.mp4';
import placeholder from '../../Assets/Media/placeholder.webp';
import './HomePage.scss';
import { AnimatedSwitch } from 'react-router-transition';
import { useSelector, useDispatch } from 'react-redux';
import { bounceIn, bounceTransition, slideSide, slideSideTransition } from './routerTransitions';
import { Pagination } from '../../Components/Cards/Pagination';
import { NavbarBrand } from 'Components/NavBar/NavbarBrand';
import { routes } from './homePageUtils';
import { unsubscribeFromAuth } from 'Services/Firebase/firebaseAuth';
import { Loader } from '../Loader/Loader';
import ErrorBoundary from 'Layouts/ErrorBoundary/ErrorBoundary';
// import { Page404 } from './Page404';
const Collections = lazy(() => import('../Collections/Collections'));
const SignInRegister = lazy(() => import('../SignInRegister/SignInRegister'));
const ItemDetails = lazy(() => import('../../Components/Item/ItemDetails'));
const UserPage = lazy(() => import('../UserPage/UserPage'));
const CartPage = lazy(() => import('../CartPage/CartPage'));
const Checkout = lazy(() => import('../Checkout/Checkout'));
const totalPages = 5;
const getPageArray = () => {
  let arrayList = [];
  for (let i = 1; i <= totalPages; i++) {
    arrayList.push(i);
  }
  return arrayList;
};
const pageArray = getPageArray();

const { CART, USER_PAGE, USER, HOME, CHECKOUT, COL } = routes;
const videoOptions = {
  src: vid,
  autoPlay: true,
  muted: true,
  loop: true,
  playsInline: true,
  poster: placeholder,
};
const HomePage = ({ hideLoader, persistor }) => {
  const { isHidden } = useSelector((state) => state.general);
  const { currentLocation } = useSelector((state) => state.location);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      await unsubscribeFromAuth(dispatch, hideLoader);
    };
    fetchUser();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const getPersistance = async () => {
      if (currentUser) {
        console.log('Welcome', currentUser);
        await persistor.pause();
        await persistor.purge();
      } else {
        console.log('Logged out');
        const getPersistanceState = await persistor.persist();
        console.log(getPersistanceState);
      }
    };
    getPersistance();
    // eslint-disable-next-line
  }, [currentUser]);
  return (
    <div>
      <Route exact path={HOME}>
        <div className="video-container">
          <Cover videoOptions={videoOptions} remeasureOnWindowResize />
        </div>
      </Route>
      <NavBar />
      <div
        className={` ${
          currentLocation === HOME ? 'is-blurry hero is-fullheight' : 'is-muted-link'
        }`}
      >
        <NavbarBrand />
        <AnimatedSwitch
          {...bounceTransition}
          mapStyles={bounceIn}
          runOnMount
          className="switch-wrapper-1"
        >
          <Route exact path={HOME}>
            <HeroBody />
          </Route>
        </AnimatedSwitch>
      </div>
      <AnimatedSwitch {...slideSideTransition} className="switch-wrapper" mapStyles={slideSide}>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path={COL}>
                <section className="px-2 mt-5">
                  <Collections />
                </section>
              </Route>
              <Route exact path={USER_PAGE}>
                <section className="px-2 mt-5">
                  <SignInRegister />
                </section>
              </Route>
              {currentUser !== null ? (
                <Route path={USER}>
                  <section className="px-2 mt-5">
                    <UserPage />
                  </section>
                </Route>
              ) : null}
              <Route exact path={CART}>
                <section className="px-2 mt-5">
                  <CartPage />
                </section>
              </Route>
              <Route exact path={CHECKOUT}>
                <section className="px-2 mt-5">
                  <Checkout />
                </section>
              </Route>
              {currentLocation !== HOME ? (
                <Route>
                  <section className="px-2 mt-5">
                    <Page404 />
                  </section>
                </Route>
              ) : null}
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </AnimatedSwitch>

      {currentLocation.match(/\/[0-9]{1}/) ? (
        <Headroom disableInlineStyles>
          <Pagination pageArray={pageArray} />
        </Headroom>
      ) : null}

      {!isHidden ? (
        <Suspense fallback={<Loader />}>
          <ItemDetails />
        </Suspense>
      ) : null}
    </div>
  );
};

export default HomePage;
