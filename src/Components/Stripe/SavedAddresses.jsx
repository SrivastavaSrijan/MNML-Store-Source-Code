import React from 'react';
import { Fade } from 'react-reveal';
import { camelCase } from 'Services/Redux/Database/helperFunctions';
import { addressIcons } from 'Layouts/UserPage/userActions';

export const SavedAddresses = ({ userSavedValues }) => {
  return (
    <Fade duration={500}>
      <div className="box is-muted-primary" style={{ width: '30vw', margin: '0 auto' }}>
        {Object.entries(userSavedValues).map(([key, values], index) => (
          <div key={key}>
            <div className="panel-block" s>
              <span className="panel-icon ">
                <i>{addressIcons[key]}</i>
              </span>
              <span className="mt-2 ml-5">
                <span className="has-text-weight-bold ml-2">{camelCase(key)} &mdash; </span>
                {values}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Fade>
  );
};
