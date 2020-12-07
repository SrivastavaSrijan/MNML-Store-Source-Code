import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bookmark } from 'react-feather';

export const Pagination = ({ pageArray }) => {
  const { currentLocation } = useSelector((state) => state.location);
  const routeLoc = currentLocation.split('/')[1] + '/' + currentLocation.split('/')[2];

  return (
    <div
      className="is-flex box is-hcentered is-vcentered is-muted-link "
      style={{ width: 'fit-content', margin: '0 auto', padding: '1rem 0.5rem' }}
    >
      <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
        {/* <a className="pagination-previous">Previous</a>
      <a className="pagination-next">Next page</a> */}
        <ul className="pagination-list">
          {pageArray.map((item) => (
            <li key={item}>
              <Link
                className={`pagination-link mr-1 ${
                  `/${routeLoc}/${item}` === currentLocation
                    ? 'is-active-page has-text-black'
                    : 'is-inactive has-text-black'
                }`}
                to={`/${routeLoc}/${item}`}
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link
              className={`pagination-link   ${
                `/${routeLoc}/0/SavedItems` === currentLocation
                  ? 'is-active-page has-text-black'
                  : 'is-inactive has-text-black'
              }`}
              to={`/${routeLoc}/0/SavedItems`}
            >
              <Bookmark />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
