import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../Services/Stripe/stripeUtils';

export const StripeCore = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
