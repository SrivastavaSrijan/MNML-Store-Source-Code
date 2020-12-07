import React from 'react';
import { Cards } from '../../Components/Cards/Cards';
import Masonry from 'react-masonry-css';
import './CardList.scss';
import { Route, Switch } from 'react-router-dom';
import { slideUpTrans, slideUp } from 'Layouts/HomePage/routerTransitions';
import { AnimatedSwitch } from 'react-router-transition';
import { useSelector } from 'react-redux';
import { SavedItemsError } from './SavedItemsError';
import { CardError } from './CardError';
import { Page404 } from 'Layouts/HomePage/Page404';

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1,
  500: 1,
};
const totalPages = 5;
const getPageArray = () => {
  let arrayList = [];
  for (let i = 1; i <= totalPages; i++) {
    arrayList.push(i);
  }
  return arrayList;
};

const pageArray = getPageArray();
export const CardList = ({ productList, path }) => {
  const { savedItems } = useSelector((state) => state.cart);
  const { isFetching } = useSelector((state) => state.general);

  return (
    <div>
      <Switch>
        <AnimatedSwitch {...slideUpTrans} className="switch-wrapper" mapStyles={slideUp}>
          {Object.keys(productList).length > 0 ? (
            pageArray.map((el) => {
              return (
                <Route key={el} exact path={`/Collections/${path}/${el}`}>
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {Object.entries(productList).map(([key, value], index) => {
                      return index >= (el - 1) * 6 && index <= (el - 1) * 6 + 5 ? (
                        <Cards key={key} item={value} />
                      ) : null;
                    })}
                  </Masonry>
                </Route>
              );
            })
          ) : (
            <Route exact path={`/Collections/${path}/([0-9])`}>
              <CardError />
            </Route>
          )}
          <Route exact path={`/Collections/${path}/0/SavedItems`}>
            {isFetching ? (
              <CardError />
            ) : Object.keys(savedItems).length > 0 ? (
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {Object.entries(savedItems).map(([key, item]) => (
                  <Cards key={key} item={item} />
                ))}
              </Masonry>
            ) : (
              <SavedItemsError path={path} />
            )}
          </Route>
          <Route>
            <section className="section  mt-2">
              <Page404 />
            </section>
          </Route>
        </AnimatedSwitch>
      </Switch>
    </div>
  );
};
//  {pageArray.map(el => {
//             Object.entries(productList).map(([key, value]) => {
//           return (
//             <Route key={key} exact path={`/${el}`}>
//               <Cards item={value} />
//             </Route>
//           )
//         })
//         })
