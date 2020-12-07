import { Home, Mail, User, Compass, MapPin, Hash } from 'react-feather';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import axios from 'axios';
export const PUBLISHABLE_KEY =
  'pk_test_51H0pV6D69oy9wBSwNZMiTHl5ZOTyx1apUaEoElxOEbCIGOQA1deddv1UTRI4DKBOk9VBR7lHbHIcxHFcqmwsZvWr001kD3Mz6p';

export const stripePromise = loadStripe(PUBLISHABLE_KEY);
export const formInputs = [
  {
    forWhat: 'name',
    label: 'Name',
    type: 'name',
    autoComplete: 'name',
    icon: <User />,
  },
  {
    forWhat: 'email',
    label: 'Email Address',
    type: 'email',
    autoComplete: 'email',
    icon: <Mail />,
  },
  {
    forWhat: 'address',
    label: 'Shipping Address',
    type: 'address',
    autoComplete: 'street-address',
    icon: <MapPin />,
  },
  {
    forWhat: 'city',
    label: 'City',
    type: 'city',
    autoComplete: 'address-level2',
    icon: <Compass />,
  },
  {
    forWhat: 'state',
    label: 'State',
    type: 'state',
    autoComplete: 'address-level1',
    icon: <Home />,
  },
  // {
  //   forWhat: 'country',
  //   label: 'Country',
  //   type: 'country',
  //   autoComplete: 'country-name',
  //   icon: '',
  // },
  {
    forWhat: 'zip',
    label: 'ZIP Code',
    type: 'zip',
    autoComplete: 'postal-code',
    icon: <Hash />,
  },
];
export const cardElementOptions = {
  style: {
    base: {
      fontSize: '22px',
      fontFamily: 'Overpass',
      '::placeholder': {
        color: 'rgba(54, 54, 54,0.5)',
      },
      iconColor: 'rgba(54, 54, 54,0.5)',
    },
  },
};
export const getPayment = async (amount) => {
  try {
    const { data: clientSecret } = await axios.post('http://localhost:8080/', {
      amount: amount,
    });
    console.log(clientSecret);
    return clientSecret;
  } catch (error) {
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    return errorObject;
  }
};
