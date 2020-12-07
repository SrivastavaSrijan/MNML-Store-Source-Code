import React from 'react';
import { useSelector } from 'react-redux';
import './CartComponent.scss';
import Tada from 'react-reveal/Tada';
import { StripeButton } from '../Stripe/StripeButton';
export const CartFooter = () => {
  const { totalCostOfCart, totalCostOfCartAfterDiscount } = useSelector((state) => state.cart);

  return (
    <article className="message is-link">
      <div className="message-header">
        <span className="subtitle is-size-6 is-size-7-mobile has-text-white is-italic">
          Details
        </span>
      </div>
      <div className="is-flex is-vcentered total-price has-text-black px-3">
        <span className="is-size-6 is-size-7-mobile my-1 mx-2">Bag Total</span>
        <span className="is-size-6 is-size-7-mobile is-crossed-text ">
          &#x20B9;{totalCostOfCart}
        </span>
      </div>
      <div className="is-flex is-vcentered total-price has-text-black px-3">
        <span className="is-size-6 is-size-7-mobile my-1 mx-2">Savings</span>
        <Tada duration={200} spy={totalCostOfCartAfterDiscount}>
          <span className="is-size-6 is-size-7-mobile has-text-warning ">
            - &#x20B9;{totalCostOfCart - totalCostOfCartAfterDiscount}
          </span>
        </Tada>
      </div>
      <div className="is-flex is-vcentered total-price has-text-black px-3">
        <span className="is-size-5 is-size-6-mobile my-1 mx-2">Total</span>
        <Tada duration={1000} spy={totalCostOfCartAfterDiscount}>
          <span className="is-size-3 is-size-4-mobile has-text-black ">
            &#x20B9;{totalCostOfCartAfterDiscount}
          </span>
        </Tada>
      </div>
      <div className="is-flex is-vcentered my-3 py-2 has-text-black px-3">
        <StripeButton price={totalCostOfCartAfterDiscount} />
      </div>
    </article>
  );
};
