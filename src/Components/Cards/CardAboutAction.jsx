import React from 'react';
import './Cards.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHidden, showDetails } from 'Services/Redux/General/generalActions';
import { Info } from 'react-feather';
export const CardAboutAction = ({ id, fromCollection }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.general);
  return (
    <p className="card-footer-item-small">
      <button
        disabled={isLoading}
        className={`button is-small is-rounded is-white ${isLoading ? `is-loading` : ``}`}
        onClick={async () => {
          dispatch(showDetails(id, fromCollection));
          dispatch(toggleHidden());
        }}
      >
        <span className="icon is-small">
          <i>
            <Info size={20} />
          </i>
        </span>
        <span className="is-size-6 is-size-7-mobile">Info</span>
      </button>
    </p>
  );
};
