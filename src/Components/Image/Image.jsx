import React, { useState } from 'react';

// import loadingImage from '../../Assets/SVG/Spinner.svg';
import Img from 'react-cool-img';
//import { Fade } from 'react-reveal';
// const API = (width, height, hex) => `http://singlecolorimage.com/get/${hex}/${width}x${height}`;
export function Image({ img, alt, style, color, is, children, ...otherProps }) {
  const placeholderImage = { backgroundColor: '#' + color, ...style };
  const [isLoaded, setLoad] = useState(false);
  return (
    <picture
      className={`${is ? `image is-${is}` : 'image'} ${!isLoaded ? 'image--loading' : ''}`}
      style={{ overflow: 'hidden' }}
    >
      {/* <Img
        style={{ objectFit: "contain" }}
        placeholder={loadingImage}
        error={errorImage}
        type="image/webp"
        srcSet={imgWebp}
        alt="A picture of me"
      />
      <Img
        style={{ objectFit: "contain" }}
        placeholder={loadingImage}
        type="image/webp"
        error={errorImage}
        srcSet={imgJpg}
        alt={alt}
        debounce={1000}
      /> WebP implementation */}
      <Img
        {...otherProps}
        alt={alt}
        debounce={1000}
        style={placeholderImage}
        lazy
        src={img}
        onLoad={() => setLoad(true)}
      />
      {children}
    </picture>
  );
}
