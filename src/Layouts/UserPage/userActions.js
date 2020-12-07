import {
  RefreshCcw,
  CheckCircle,
  Mail,
  Edit3,
  User,
  Compass,
  MapPin,
  Hash,
  Home,
} from 'react-feather';
import React from 'react';
export const userActions = [
  {
    title: 'Change password',
    href: '/User/ChangePassword',
    icon: <RefreshCcw />,
    id: 1,
    subtitle: 'Click on the button below to',
    buttonText: 'Send password reset email',
  },
  {
    title: 'Verify email',
    href: '/User/VerifyEmail',
    icon: <CheckCircle />,
    id: 2,
    subtitle: 'Click on the button below to',
    buttonText: 'Verify your email address',
  },
  {
    title: 'Change email',
    href: '/User/ChangeEmail',
    icon: <Mail />,
    id: 3,
    subtitle: 'Click on the button below to',
    buttonText: 'Change email',
  },
  {
    title: 'Edit Info',
    href: '/User/EditInfo',
    icon: <Edit3 />,
    id: 4,
    subtitle: 'Click on the button below to',
    buttonText: 'Edit Details',
  },
];
export const userDetails = [
  {
    title: 'Details',
    href: 'DET',
    id: 1,
  },
  {
    title: 'Orders',
    href: 'ORD',
    id: 2,
  },
  {
    title: 'MNML Wallet',
    href: 'WAL',
    id: 3,
  },
  {
    title: 'Saved Address',
    href: 'ADD',
    id: 4,
  },
];
export const addressIcons = {
  name: <User />,
  displayName: <User />,
  email: <Mail />,

  address: <MapPin />,

  city: <Compass />,

  state: <Home />,

  zip: <Hash />,
};
