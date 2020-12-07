import React from 'react';
import { useSelector } from 'react-redux';
import { ListItem } from './ListItem';

export const Buttons = ({ location, anonPages, userPages }) => {
  const {
    user: { currentUser },
    cart: { cartItems },
  } = useSelector((state) => state);

  return currentUser === null
    ? anonPages.map(({ title, href, id }) => {
        return (
          <ListItem
            key={id + title}
            location={location}
            href={href}
            title={title}
            length={cartItems.length}
          />
        );
      })
    : userPages.map(({ title, href, id }) => (
        <>
          <ListItem
            key={id + title}
            location={location}
            href={href}
            title={title}
            length={cartItems.length}
            displayName={currentUser.displayName}
          />
        </>
      ));
};
