import React, { useState } from 'react';
import { ArrowLeft, CreditCard } from 'react-feather';
import { Fade } from 'react-reveal';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { cardElementOptions, getPayment } from '../../Services/Stripe/stripeUtils';
import { useSelector } from 'react-redux';

export const StripeForm = ({ formValues, setShowCard }) => {
  const { totalCostOfCartAfterDiscount } = useSelector((state) => state.cart);

  const [error, setStatus] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setSubmitting] = useState(false);
  const handleSubmitPayment = async () => {
    try {
      const clientSecret = await getPayment(totalCostOfCartAfterDiscount * 100);

      const cardElement = elements.getElement('card');
      const { name, email, address, city, state, zip } = formValues;
      const reqObject = {
        name,
        email,
        address: {
          line1: address,
          city,
          state,
          country: 'IN',
          postal_code: zip,
        },
      };
      const paymentMethodReq = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: reqObject,
      });
      const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });
      if (paymentMethodReq.error) {
        setStatus(paymentMethodReq.error.message);
        return;
      }

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodReq.paymentMethod.id,
      });

      if (error) {
        setStatus(error.message);
        return;
      }
      setPaymentStatus(confirmedCardPayment);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div>
      <button
        className="button ml-2 is-success is-light is-rounded"
        onClick={() => setShowCard(false)}
      >
        <span className="icon is-small">
          <i>
            <ArrowLeft size={20} />
          </i>
        </span>
        <span className="is-size-6 is-size-7-mobile">Edit shipping address</span>
      </button>

      <section className="px-4 py-2 section mt-6">
        <CardElement options={cardElementOptions} hidePostalCode />
        <div className="field mt-6">
          <div className="control is-hcentered">
            <button
              className={`button is-fullwidth is-medium is-success ${
                isSubmitting ? `is-loading` : ``
              }`}
              onClick={async () => {
                setSubmitting(true);
                await handleSubmitPayment();
                setSubmitting(false);
              }}
              disabled={isSubmitting}
              type="button"
            >
              <span className="icon is-large">
                <CreditCard size={30} />
              </span>
              <span className="is-size-4 is-size-5-mobile">
                Pay &#x20B9;{totalCostOfCartAfterDiscount}
              </span>
            </button>
          </div>
        </div>
      </section>
      {error ? (
        <Fade bottom collapse duration={300}>
          <p className="content mt-2 has-text-black">
            <span className="help is-danger">{error}</span>
          </p>
        </Fade>
      ) : null}
      {paymentStatus ? (
        <Fade bottom collapse duration={300}>
          <p className="content mt-2 has-text-black">
            <span className="is-link is-size-6">{paymentStatus}</span>
          </p>
        </Fade>
      ) : null}
      <p className="content mt-4 has-text-black is-size-7"></p>
    </div>
  );
};
