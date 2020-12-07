import React from 'react';
import { ArrowLeftCircle } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';

export const CartError = ({ path }) => {
  const history = useHistory();
  return (
    <Pulse duration={500}>
      <div
        className="mt-6 box is-muted-danger has-text-centered"
        style={{ width: 'fit-content', margin: '0 auto' }}
      >
        <h1 className=" has-text-black is-size-4">Your cart is empty, add some items</h1>

        <button
          className="button mt-4 is-danger is-large is-fullwidth"
          onClick={() => {
            history.push(`/Collections`);
          }}
        >
          <span className="icon is-small">
            <i>
              <ArrowLeftCircle size={20} />
            </i>
          </span>
          <span className="is-size-5 is-size-6-mobile">Check out the collections</span>
        </button>
      </div>
    </Pulse>
  );
};
