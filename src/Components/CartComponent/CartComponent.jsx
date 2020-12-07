import React from 'react';
import { useSelector } from 'react-redux';
import { Image } from '../Image/Image';
import { CartL1 } from './CartL1';
import { CartL2 } from './CartL2';
import { Fade } from 'react-reveal';

export const CartComponent = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <div className="">
      {cartItems &&
        Object.entries(cartItems).map(([key, item], index) => {
          const {
            discountGiven,
            fromCollection,
            id,
            photoUrl,
            priceArray,
            sizeArray,
            prodDesc,
            userName,
            sizesSelected,
            colorPlaceholder,
          } = item;
          return (
            <div className="box" key={id + sizesSelected}>
              <Fade key={item.id} cascade duration={700}>
                <article className="columns is-marginless">
                  <div className="column is-7">
                    <div className="content">
                      <p className="title is-size-4 is-size-5-mobile">
                        <strong>{userName}</strong>
                      </p>

                      <p className="subtitle title is-size-6 has-text-black is-size-7-mobile">
                        {prodDesc}
                      </p>
                    </div>
                    <CartL1
                      priceArray={priceArray}
                      discountGiven={discountGiven}
                      fromCollection={fromCollection}
                    />
                    <CartL2
                      sizeArray={sizeArray}
                      item={item}
                      fromCollection={fromCollection}
                      sizesSelected={sizesSelected}
                    />
                  </div>
                  <div className="column is-5" style={{ overflow: 'hidden' }}>
                    <Image
                      color={colorPlaceholder}
                      img={photoUrl}
                      is="1by1"
                      style={{ objectFit: 'cover' }}
                      alt={userName}
                    />{' '}
                  </div>
                </article>
              </Fade>
            </div>
          );
        })}
    </div>
  );
};
