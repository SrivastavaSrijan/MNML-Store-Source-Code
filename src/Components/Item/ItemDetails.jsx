import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHidden } from 'Services/Redux/General/generalActions';
import AriaModal from 'react-aria-modal';
import './ItemDetails.scss';
import { Image } from 'Components/Image/Image';
import { CardPrices } from '../Cards/CardPrices';
// import { CardActions } from '../CardAboutAction';
import { MapPin, Wind, Activity, BellOff, ArrowLeft, ArrowRight } from 'react-feather';
import { CardAddRemoveAction } from '../Cards/CardAddRemoveAction';
import { Fade } from 'react-reveal';
import { SizingChart } from './SizingChart';
const featuresObj = [
  {
    id: 1,
    desc:
      "Made from 100% fine-spun cotton that's naturally breathable. The loose Piqué knit makes it even more airy.",
    icon: <Wind color="black" size={27} />,
    title: 'Breathe In.',
  },
  {
    id: 2,
    desc:
      'The fabric construction lends itself to an effortless drape. A relaxed fit allows you to move freely and take on anything.',
    icon: <Activity color="black" size={27} />,
    title: 'Do More.',
  },
  {
    id: 3,
    desc:
      'The modern cut stays sharp right through the day. No telltale wrinkles, no worrying about maintenance',
    icon: <BellOff color="black" size={27} />,
    title: 'Care Less.',
  },
];
const ItemDetails = () => {
  const [showChart, setShowChart] = useState(false);
  const { isHidden, detailID } = useSelector((state) => state.general);
  const { id, fromCollection } = detailID;
  const productData = useSelector((state) => state.database[fromCollection]);

  const dispatch = useDispatch();
  const productObject = productData[id];
  const {
    userName,
    photoUrl,
    prodDesc,
    priceArray,
    sizeArray,
    discountGiven,
    userDetails,
    colorPlaceholder,
  } = productObject;
  return (
    <AriaModal
      mounted={!isHidden}
      // onExit={}

      focusDialog={true}
      titleId="modal-title"
      verticallyCenter={true}
      underlayClass="modal-background"
      dialogClass="modal-content"
    >
      <Fade duration={700}>
        <article className="message is-link " style={{ overflowY: 'hidden' }}>
          <div className="message-header">
            <h1>Product Details</h1>

            <button
              className="delete"
              aria-label="delete"
              onClick={() => dispatch(toggleHidden())}
            ></button>
          </div>
          <div
            className="message-body "
            style={{ overflowY: 'auto', overflowX: 'hidden', height: '80vh' }}
          >
            <div className="columns " style={{ paddingBottom: '10.75rem' }}>
              <div className="column is-7">
                <Image
                  alt={userName}
                  img={photoUrl}
                  color={colorPlaceholder}
                  is="3by4"
                  style={{ zIndex: 0, objectFit: 'cover' }}
                />

                <span className="has-text-black has-text-centered is-size-7 is-italic has-text-weight-light is-family-monospace">
                  Sizes available &mdash;
                  {sizeArray.map((size) => (
                    <span key={size}> {size} </span>
                  ))}
                </span>
                <button
                  className="button mt-3 is-small is-link is-fullwidth"
                  onClick={() => setShowChart(!showChart)}
                >
                  {!showChart ? (
                    <>
                      <span className="is-size-6 is-size-7-mobile has-text-white">
                        Show Sizing Chart
                      </span>
                      <span className="icon is-small">
                        <i>
                          <ArrowRight size={24} color="white" />
                        </i>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="icon is-small">
                        <i>
                          <ArrowLeft size={24} color="white" />
                        </i>
                      </span>
                      <span className="is-size-6 is-size-7-mobile has-text-white">
                        Show Features
                      </span>
                    </>
                  )}
                </button>
              </div>
              <div className="column is-5">
                <h1 className="title is-size-3 is-size-4-mobile">{userName}</h1>
                <h2 className="subtitle is-size-6 is-size-7-mobile has-text-black">{prodDesc}</h2>
                <CardPrices priceArray={priceArray} discountGiven={discountGiven} />
                <CardAddRemoveAction item={productObject} />
                <span className="mr-2">
                  <MapPin size={14} />
                </span>
                <span>{userDetails.location}</span>
                <Fade right spy={showChart} duration={500}>
                  <div className=" mt-2 is-marginless">
                    {!showChart ? (
                      featuresObj.map(({ id, desc, icon, title }) => {
                        return (
                          <div key={id} className=" mr-2 px-2 has-text-centered box is-muted-link">
                            <div>
                              {icon}
                              <br />
                              <span className="is-size-5 is-size-6-mobile  has-text-black ">
                                {title}
                              </span>
                            </div>
                            <div className="is-size-6 is-size-7-mobile has-text-left is-family-secondary  has-text-black">
                              {desc}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <SizingChart />
                      </div>
                    )}
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </article>
      </Fade>
    </AriaModal>
  );
};
export default ItemDetails;
