import React from 'react';
import { RefreshCcw } from 'react-feather';
import Pulse from 'react-reveal/Pulse';
export const Loader = () => (
  <Pulse duration={500}>
    <div
      className="box mt-6
              is-muted-link has-text-centered"
      style={{ width: 'fit-content', margin: '0 auto' }}
    >
      <h1 className="has-text-black is-size-4">Please wait...</h1>
      <button className="button is-link is-loading">
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
