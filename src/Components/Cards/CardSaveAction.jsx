import React from 'react';
import './Cards.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateSavedItem } from 'Services/Redux/Cart/cartActions';
import { Bookmark } from 'react-feather';
export const CardSaveAction = ({ item }) => {
  const dispatch = useDispatch();
  const isSaved = 'isSaved' in item ? (item['isSaved'] === true ? true : false) : false;

  const { isLoading } = useSelector((state) => state.general);
  return (
    <button
      disabled={isLoading}
      className={`button ml-2 is-link is-light is-small is-rounded has-text-black ${
        isLoading ? `is-loading` : ``
      }`}
      onClick={async () => {
        item['isSaved'] = !isSaved;
        dispatch(updateSavedItem(item, isSaved));
      }}
    >
      {' '}
      <span className="icon is-small">
        <i>
          <Bookmark size={18} color="black" style={isSaved ? { fill: 'black' } : null} />
        </i>
      </span>
      {isSaved ? <span> Saved! </span> : null}
    </button>
  );
};
