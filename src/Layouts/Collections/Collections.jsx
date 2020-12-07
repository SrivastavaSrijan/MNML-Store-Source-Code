import React, { useEffect } from 'react';
import { ProductFeatures } from 'Layouts/CardList/ProductFeatures';
import { slideSide, slideSideTransition } from 'Layouts/HomePage/routerTransitions';
import { AnimatedSwitch } from 'react-router-transition';
import { Route, Switch } from 'react-router-dom';
import { CardList } from 'Layouts/CardList/CardList';
import { useSelector, useDispatch } from 'react-redux';
import { routes, getItemsFromLocalStorage } from 'Layouts/HomePage/homePageUtils';
import { Title } from 'Components/Title/Title';
import { getData, setSummerData, setWinterData } from 'Services/Redux/Database/databaseActions';
import { setFetching } from 'Services/Redux/General/generalActions';
import { Page404 } from 'Layouts/HomePage/Page404';

const Collections = () => {
  const { cartItems, savedItems } = useSelector((state) => state.cart);
  const { summerData, winterData } = useSelector((state) => state.database);
  const dispatch = useDispatch();
  useEffect(() => {
    const [summerDataLocal, winterDataLocal] = getItemsFromLocalStorage();
    if (!summerDataLocal || !winterDataLocal) {
      dispatch(getData());
    } else {
      dispatch(setSummerData(summerDataLocal));
      dispatch(setWinterData(winterDataLocal));
      dispatch(setFetching(false));
    }
    dispatch({ type: 'PUT_CART_ITEMS', payload: cartItems });
    dispatch({ type: 'PUT_SAVED_ITEMS', payload: savedItems });

    // eslint-disable-next-line
  }, []);

  const { COL, WIN, SUM } = routes;
  return (
    <AnimatedSwitch
      {...slideSideTransition}
      className="switch-wrapper"
      mapStyles={slideSide}
      runOnMount
    >
      <Switch>
        <Route exact path={COL}>
          <Title title="Latest collections" subtitle="Check out our work" />

          <ProductFeatures />
        </Route>
        <Route path={SUM}>
          <Title title="Summer '20." subtitle="Our favorites from" />

          <CardList productList={summerData} path="Summer-2020" />
        </Route>
        <Route path={WIN}>
          <Title title="Winter '19." subtitle="Our favorites from" />

          <CardList productList={winterData} path="Winter-2019" />
        </Route>
        <Route>
          <section className="section  mt-2">
            <Page404 />
          </section>
        </Route>
      </Switch>
    </AnimatedSwitch>
  );
};
export default Collections;
