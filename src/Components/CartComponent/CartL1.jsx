import React from 'react';
import { Tag, Sun, CloudSnow } from 'react-feather';

export const CartL1 = ({ priceArray, discountGiven, fromCollection }) => {
  return (
    <nav className="level is-mobile">
      <div className="level-left">
        <span
          className="level-item has-text-black is-crossed-text is-size-5 is-size-7-mobile"
          aria-label="Original Price"
        >
          &#x20B9;{priceArray[1]}
        </span>
        <span
          className="level-item has-text-black is-size-5 is-size-7-mobile"
          aria-label="Percent discount"
        >
          {discountGiven}% OFF
        </span>
        <span className=" level-item">
          <span className=" has-text-black is-size-5 is-size-7-mobile">
            {fromCollection === 'summerData' ? <Sun size={14} /> : <CloudSnow size={24} />}
          </span>
        </span>
        <span
          className="level-item has-text-black is-size-5 is-size-6-mobile is-uncrossed-text"
          aria-label="Discounted Price"
        >
          <span className="icon mr-2">
            <Tag color="black" size={16} />
          </span>
          &#x20B9;{priceArray[0]}
        </span>
      </div>
    </nav>
  );
};
