import React from 'react';
import './HeroBody.scss';
import { Fade } from 'react-reveal';
import { ArrowRightCircle } from 'react-feather';
import { Link } from 'react-router-dom';
export const HeroBody = () => {
  return (
    <div className="hero-body container is-fluid">
      <div className="columns">
        <div className="column is-8">
          <h1 className="title is-size-1 has-text-weight-bold is-size-2-mobile has-text-white">
            less is more
          </h1>
          <Fade delay={1500}>
            <div className="button-container mt-6  has-text-white">
              <Link to="/Collections">
                <button className="button is-white is-outlined is-large">
                  <span className="is-size-5">Explore</span>
                  <span className="icon is-medium mt-2">
                    <i>
                      <ArrowRightCircle size={30} />
                    </i>
                  </span>
                </button>
              </Link>
            </div>
          </Fade>
        </div>

        {/*<Fade right delay={700}>
        <div className="column image is-4 mt-5 my-2 is-avatar-hero"></div>
      </Fade> */}
      </div>
    </div>
  );
};
