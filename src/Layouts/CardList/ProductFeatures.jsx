import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Tiles } from 'Components/Tiles/Tiles';
import { featureListSummer, featureListWinter } from './FeatureList';
let settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
  fade: true,
  initialSlide: 1,
  swipeToSlide: true,
  pauseOnHover: true,
  autoplay: true,
  focusOnSelect: true,
  speed: 500,
  autoplaySpeed: 2000,
  centerPadding: '60px',
  centerMode: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        centerMode: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export const ProductFeatures = () => {
  return (
    <div className="container is-fluid mt-5 fit-desktop">
      <Slider {...settings}>
        {featureListSummer.map(({ title, subtitle, image, color, col }) => (
          <Tiles
            key={title}
            title={title}
            subtitle={subtitle}
            image={image}
            color={color}
            col={col}
          />
        ))}
        {featureListWinter.map(({ title, subtitle, image, color, col }) => (
          <Tiles
            key={title}
            title={title}
            subtitle={subtitle}
            image={image}
            color={color}
            col={col}
          />
        ))}
      </Slider>
    </div>
  );
};
