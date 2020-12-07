import React from 'react';
import { Minus, Plus } from 'react-feather';
import { updateItem } from 'Services/Redux/Cart/cartActions';
import { useSelector } from 'react-redux';
import { updateSizeItem } from 'Services/Redux/Database/helperFunctions';
export const CartL3 = ({ value, quantityAddedOfSize, item, dispatch }) => {
  const { isLoading } = useSelector((state) => state.general);
  return (
    <div key={value} className="level is-mobile">
      <div className="level-left has-text-black is-size-6 is-size-7-mobile">
        <div className="field">
          <span className="tag is-size-6 is-size-7-mobile is-link">{value}</span>
        </div>
      </div>
      <div className="level-right has-text-black is-size-6 is-size-7-mobile">
        <div className="field ">
          <div className="control" style={{ display: 'flex' }}>
            <button
              disabled={isLoading || quantityAddedOfSize - 1 === 0}
              className={`button is-link is-small mb-2" ${isLoading ? `is-loading` : ``}`}
              onClick={() => {
                item.sizesSelected = updateSizeItem(item.sizesSelected, value, false, false);
                dispatch(updateItem(item));
              }}
            >
              <Minus size={12} />
            </button>
            <p className="mx-2 mt-1 py-2 tag is-muted-black ">
              <span className="has-text-white">{quantityAddedOfSize}</span>
            </p>
            <button
              disabled={isLoading}
              className={`button is-link is-small mb-2" ${isLoading ? `is-loading` : ``}`}
              onClick={async () => {
                item.sizesSelected = updateSizeItem(item.sizesSelected, value, true, false);
                dispatch(updateItem(item));
              }}
            >
              <Plus size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
