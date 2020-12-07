import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Scissors } from 'react-feather';
import { removeItem } from 'Services/Redux/Cart/cartActions';

import { Fade } from 'react-reveal';
import { CartL3 } from './CartL3';
export const CartL2 = ({ item, sizesSelected }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.general);
  const [showSizes, setShowSizes] = useState(false);
  return (
    <>
      <div className="buttons">
        <div className="field">
          <div className="control">
            <button
              disabled={isLoading}
              className={`button ml-3 is-danger mb-2" ${isLoading ? `is-loading` : ``}`}
              onClick={async () => {
                dispatch(removeItem(item));
              }}
            >
              {' '}
              <span className="icon is-small">
                <i>
                  <Trash2 size={24} />
                </i>
              </span>
              <span className="is-size-6 is-size-7-mobile">Delete</span>
            </button>
            <button
              className="button ml-3 is-success mb-2 has-text-black is-light"
              onClick={() => setShowSizes(!showSizes)}
            >
              <span className="icon is-small">
                <i>
                  <Scissors size={22} />
                </i>
              </span>
              <span className="is-size-6 is-size-7-mobile">Edit Quantity</span>
            </button>
          </div>
        </div>
      </div>
      <Fade bottom opposite when={showSizes} duration={600}>
        <div>
          {showSizes
            ? sizesSelected.map(({ value, quantityAddedOfSize }) =>
                quantityAddedOfSize > 0 ? (
                  <CartL3
                    key={value}
                    value={value}
                    quantityAddedOfSize={quantityAddedOfSize}
                    item={item}
                    dispatch={dispatch}
                  />
                ) : null,
              )
            : null}
        </div>
      </Fade>
    </>
  );
};
