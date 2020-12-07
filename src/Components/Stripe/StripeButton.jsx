import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { ShoppingBag } from 'react-feather';
import { setLoading } from 'Services/Redux/General/generalActions';
import { GlobalContext } from 'index';
import { useDispatch, useSelector } from 'react-redux';

export const StripeButton = ({ price }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.general);
  const { setDelay } = useContext(GlobalContext);
  return (
    <button
      disabled={isLoading}
      className={`button is-primary is-medium is-fullwidth ${isLoading ? `is-loading` : ``}`}
      onClick={async () => {
        dispatch(setLoading(true));
        await setDelay(500, 1000);
        history.push('/CheckoutPage');
        dispatch(setLoading(false));
      }}
    >
      <span className="icon is-small">
        <i>
          <ShoppingBag size={30} />
        </i>
      </span>
      <span>Pay &#x20B9; {price}</span>
    </button>
  );
};
