import React, { useState } from 'react';
import './Cards.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem } from 'Services/Redux/Cart/cartActions';
import { Scissors, Trash, ShoppingCart } from 'react-feather';
import { updateSizeItem } from 'Services/Redux/Database/helperFunctions';
import { Fade } from 'react-reveal';

export const CardAddRemoveAction = ({ item }) => {
  const { sizeArray, sizesSelected } = item;
  const dispatch = useDispatch();
  const [sizeSelected, selectSize] = useState(null);
  const { isLoading } = useSelector((state) => state.general);
  const handleAdd = () => {
    item.sizesSelected = updateSizeItem(sizesSelected, sizeSelected, true, true);
    dispatch(updateItem(item));
  };
  const handleRemove = () => {
    item.sizesSelected = updateSizeItem(sizesSelected, sizeSelected, false, true);
    dispatch(updateItem(item));
  };
  return (
    <div className="card-footer-item">
      <span className="my-2 has-text-black is-size-6 is-size-7-mobile">
        <Fade duration={350}>
          <div className="field ">
            <p className="control has-icons-left">
              <span className="select is-success">
                <select
                  onChange={(event) => selectSize(event.target.value)}
                  style={{ backgroundColor: '#fff' }}
                >
                  {sizeSelected ? null : (
                    <option defaultValue className="is-size-6 is-size-7-mobile">
                      Select Size
                    </option>
                  )}
                  {sizeArray.map((size) => (
                    <option className="is-size-6 is-size-7-mobile" key={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </span>
              <span className="icon is-small is-left">
                <i>
                  {' '}
                  <Scissors size={14} color="black" />
                </i>
              </span>
            </p>
          </div>
        </Fade>
      </span>
      {sizeSelected ? (
        sizesSelected.find((sizeItem) => sizeItem.value === sizeSelected).quantityAddedOfSize >
        0 ? (
          <Fade duration={350}>
            <button
              disabled={isLoading}
              className={`button  is-danger has-text-white" ${isLoading ? `is-loading` : ``}`}
              onClick={() => handleRemove()}
            >
              <span className="icon is-small">
                <i>
                  <Trash size={20} />
                </i>
              </span>
              <span className="is-size-6 is-size-7-mobile">Remove Item</span>
            </button>
          </Fade>
        ) : (
          <Fade duration={350}>
            <button
              disabled={isLoading}
              className={`button is-success has-text-black ${isLoading ? `is-loading` : ``}`}
              onClick={() => handleAdd()}
            >
              <span className="icon is-small">
                <i>
                  <ShoppingCart size={20} />
                </i>
              </span>
              <span className="is-size-6 is-size-7-mobile">Add to cart</span>
            </button>
          </Fade>
        )
      ) : null}
    </div>
  );
};
