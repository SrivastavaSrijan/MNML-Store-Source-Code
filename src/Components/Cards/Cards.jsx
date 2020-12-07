import React, { useState } from 'react';
import { Image } from '../Image/Image';
import './Cards.scss';
import { CardPrices } from './CardPrices';
import { CardAboutAction } from './CardAboutAction';
import { CardAddRemoveAction } from './CardAddRemoveAction';
import { Fade } from 'react-reveal';
// import Pulse from 'react-reveal/Pulse';
import { toggleHidden, showDetails } from 'Services/Redux/General/generalActions';

import { X, Info } from 'react-feather';
import { CardSaveAction } from './CardSaveAction';
import { useDispatch } from 'react-redux';

export const Cards = ({ item }) => {
  const dispatch = useDispatch();

  const {
    userName,
    photoUrl,
    colorPlaceholder,
    prodDesc,
    priceArray,
    discountGiven,
    fromCollection,
    id,
  } = item;
  const [isShowing, setShow] = useState(true);
  return (
    <div className="card parent">
      <div className="card-image">
        <div className="is-uncrossed-text tag py-4 px-5 mt-5 is-muted-link float-price">
          <span className="has-text-black is-size-4 is-size-5-mobile">
            &#x20B9;
            {priceArray[0]}
          </span>
        </div>

        <Image
          alt={userName}
          img={photoUrl}
          color={colorPlaceholder}
          is="3by4"
          className="child is-hyperlink"
          style={{ zIndex: 0, objectFit: 'cover', filter: 'saturate(0.9)' }}
          onClick={async () => {
            dispatch(showDetails(id, fromCollection));
            dispatch(toggleHidden());
          }}
        >
          <div className="card-content is-flex is-hcentered">
            <div className="field is-grouped is-vcentered">
              <p className="control">
                <button
                  className="button is-link is-light is-small is-rounded has-text-black is-flex "
                  onClick={() => {
                    setShow(!isShowing);
                  }}
                >
                  {!isShowing ? (
                    <>
                      <span className="icon is-small mt-1">
                        <i>
                          <X size={20} color="black" />
                        </i>
                      </span>
                      <span className="is-size-6 is-size-7-mobile">Hide</span>
                    </>
                  ) : (
                    <>
                      <span className="icon is-small mt-1">
                        <i>
                          <Info size={20} color="black" />
                        </i>
                      </span>
                      <span className="is-size-6 is-size-7-mobile ">Quick View</span>
                    </>
                  )}
                </button>
              </p>
              <p className="control is-vcentered">
                <CardSaveAction item={item} />
              </p>{' '}
            </div>
          </div>
        </Image>
      </div>
      <Fade duration={400} delay={200} when={!isShowing}>
        <div className="blur">
          <footer className="mb-2 is-vcentered is-hcentered has-text-centered">
            <CardAboutAction
              id={item.id}
              fromCollection={item.fromCollection}
              sizeArray={item.sizeArray}
            />
            <h4 className="title has-text-weight-bold is-size-5 is-size-6-mobile has-text-white  ">
              {userName}
            </h4>
            <h5 className="subtitle is-size-6 is-size-7-mobile has-text-white has-family-secondary is-italic ">
              {prodDesc}
            </h5>
            <CardPrices discountGiven={discountGiven} priceArray={priceArray} />
          </footer>
          <div className="mx-2">
            <footer className="card-footer">
              <CardAddRemoveAction item={item} />
            </footer>
            <div className="is-flex mt-2 is-vcentered is-hcentered">
              {' '}
              <button
                onClick={() => {
                  setShow(!isShowing);
                }}
                className="button is-small is-link is-rounded is-danger"
                aria-label="delete"
              >
                <span className="icon is-small">
                  <i>
                    <X size={24} />
                  </i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};
