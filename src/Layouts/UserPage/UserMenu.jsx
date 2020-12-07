import React from 'react';
import { NavItem } from 'Components/NavBar/NavItem';
import { userActions } from './userActions';
import { UserCheck } from 'react-feather';
export const UserMenu = ({ currentLocation }) => {
  return (
    <aside className="menu">
      <p className="menu-label ml-5">Account Details</p>
      <ul className="menu-list">
        <NavItem
          exact
          title="Details"
          href="/User"
          icon={<UserCheck />}
          currentLocation={currentLocation}
        />
        <p className="menu-label ml-5">Edit Details</p>
        {userActions.map(({ title, href, icon, id }) => (
          <NavItem
            key={id}
            title={title}
            href={href}
            icon={icon}
            currentLocation={currentLocation}
          />
        ))}
      </ul>
    </aside>
  );
};
