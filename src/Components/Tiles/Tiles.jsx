import React from 'react';
import { Image } from 'Components/Image/Image';
import './Tiles.scss';
import { useHistory } from 'react-router-dom';
import { Sun, CloudSnow } from 'react-feather';

export const Tiles = ({ title, subtitle, col, image, color }) => {
  const history = useHistory();
  const handleClick = () => {
    const colOfPages = `/Collections/${col}/1`;
    history.push(colOfPages);
  };
  return (
    <div className="parent-full">
      <div className="blur-full has-text-centered is-vcentered is-hcentered has-text-white px-3 py-3">
        <h1
          className={`title is-size-2 is-size-3-mobile has-text-white has-background-${
            col === 'Summer-2020' ? `primary` : `link`
          }`}
        >
          {title}
        </h1>
        <h2
          className={`subtitle is-size-4 is-size-5-mobile  has-background-${
            col === 'Summer-2020' ? `primary` : `link`
          }`}
        >
          {subtitle}
        </h2>
        <button
          className={`button is-large py-3 ${col === 'Summer-2020' ? `is-primary` : `is-link`}`}
          onClick={() => handleClick()}
        >
          {' '}
          <p className="is-block">
            <span className="icon  mr-2 ml-1 mt-3 ">
              <i>
                {col === 'Summer-2020' ? (
                  <Sun size={35} color="white" />
                ) : (
                  <CloudSnow size={35} color="white" />
                )}
              </i>
            </span>

            <span className="is-size-5 is-size-6-mobile has-text-white">Check it out</span>
          </p>
        </button>
      </div>
      <div className="is-hidden-mobile">
        {' '}
        <Image
          style={{ zIndex: 0, objectFit: 'cover' }}
          className="child-full"
          color={color}
          is="2by1"
          img={image}
        />
      </div>
      <div className="is-hidden-tablet">
        {' '}
        <Image
          style={{ zIndex: 0, objectFit: 'cover' }}
          color={color}
          className="child-full"
          is="3by4 is-512x512"
          img={image}
        />
      </div>
    </div>
  );
};
