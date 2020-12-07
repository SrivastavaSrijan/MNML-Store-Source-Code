import { CloudSnow, Sun } from 'react-feather';
import { LogIn, User, ShoppingCart } from 'react-feather';

import React from 'react';
export const sections = [
  {
    title: 'Cart',
    icon: <ShoppingCart />,
    href: '/Cart',
    id: 3,
  },
];
export const anonPages = [
  {
    title: 'Login/Sign Up',
    icon: <LogIn />,
    href: '/UserPage',
    id: 4,
  },
];
export const userPages = [
  {
    title: 'User',
    icon: <User />,
    href: '/User',
    id: 5,
  },
];
export const collections = [
  {
    title: 'Summer',
    icon: <Sun />,
    href: '/Collections/Summer-2020/1',
    id: 1,
  },
  {
    title: 'Winter',
    icon: <CloudSnow />,
    href: '/Collections/Winter-2019/1',
    id: 2,
  },
];
