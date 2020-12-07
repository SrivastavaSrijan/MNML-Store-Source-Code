import React from 'react';
import './Cards.scss';

export const CardPrices = ({ priceArray, discountGiven }) => {
  return (
    <div className="is-flex is-vcentered is-hcentered">
      <div className=" tag py-3  is-muted-success ">
        {' '}
        <span className="is-crossed-text py-3 has-text-black is-size-7">
          &#x20B9;
          {priceArray[1]}
        </span>
      </div>
      <div className="is-uncrossed-text tag ml-1 mr-1 py-4 px-5 is-dark-success">
        <span className=" has-text-black is-size-4 is-size-6-mobile">
          &#x20B9;
          {priceArray[0]}
        </span>
      </div>
      <div className="tag py-3 is-muted-success">
        <span className="discount-text is-size-7 is-size-7-mobile has-text-black">
          {discountGiven}% OFF
        </span>
      </div>
    </div>
  );
};
