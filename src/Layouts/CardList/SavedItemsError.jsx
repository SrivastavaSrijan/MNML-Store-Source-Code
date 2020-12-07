import React from 'react';
import { ArrowLeftCircle } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';

export const SavedItemsError = ({ path }) => {
  const history = useHistory();
  return (
    <Pulse duration={500}>
      <div
        className="box mt-6 is-muted-danger has-text-centered"
        style={{ width: 'fit-content', margin: '0 auto' }}
      >
        <h1 className=" has-text-black is-size-4">No saved items.</h1>
        <button
          className="button is-danger"
          onClick={() => {
            history.replace(`/Collections/${path}/1`);
          }}
        >
          <span className="icon is-small">
            <i>
              <ArrowLeftCircle size={20} />
            </i>
          </span>
          <span className="is-size-6 is-size-7-mobile">Add some</span>
        </button>
      </div>
    </Pulse>
  );
};
