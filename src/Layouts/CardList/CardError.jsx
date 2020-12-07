import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RefreshCcw } from 'react-feather';
import { getData } from 'Services/Redux/Database/databaseActions';
import Pulse from 'react-reveal/Pulse';
export const CardError = () => {
  const { isFetching } = useSelector((state) => state.general);
  const dispatch = useDispatch();

  return (
    <Pulse spy={isFetching} duration={500}>
      <div
        className={`box mt-6 ${isFetching ? 'is-muted-link' : 'is-dark-success'} has-text-centered`}
        style={{ width: 'fit-content', margin: '0 auto' }}
      >
        <h1 className="has-text-black is-size-4">
          {isFetching ? `Please wait...` : `Almost done...`}
        </h1>
        <button
          disabled={isFetching}
          className={`button ${isFetching ? 'is-link' : 'is-success'} ${
            isFetching ? `is-loading` : ``
          }`}
          onClick={() => dispatch(getData())}
        >
          <span className="icon is-small">
            <i>
              <RefreshCcw size={20} />
            </i>
          </span>
          <span className="is-size-6 is-size-7-mobile">Refresh</span>
        </button>
      </div>
    </Pulse>
  );
};
