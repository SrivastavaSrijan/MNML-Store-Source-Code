import React from 'react';
import Fade from 'react-reveal/Fade';

import { Star, Zap, Eye, GitPullRequest } from 'react-feather';
import Img from 'react-cool-img';

export const HeroCard = ({ color, title, subtitle, imgSrc, content, links }) => {
  return (
    <div className="card custom-width mr-3">
      <div className="card-image">
        <Fade>
          <figure className="image is-3by4">
            <Img
              alt={title}
              src={imgSrc}
              // color={colorPlaceholder}

              style={{ zIndex: 0, objectFit: 'cover', filter: 'saturate(0.7)' }}
            />
          </figure>
        </Fade>
      </div>

      <div className={`notification is-muted-${color}`}>
        <Fade delay={200}>
          <table className="table is-fullwidth">
            <tbody>
              <tr className="media-content">
                <th>
                  <Star size={29} />
                </th>
                <td>
                  <h4 className="title is-size-4 is-size-5-mobile ">{title}</h4>
                  <h5 className="subtitle is-size-5 is-size-6-mobile  ">{subtitle}</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </Fade>
      </div>

      <Fade delay={500}>
        <footer className={`card-footer-${color}`}>
          <p className="card-footer-item ">
            <a className={`is-highlight-${color}`} target="_blank" rel="noopener noreferrer">
              {' '}
              Hello
            </a>
          </p>
        </footer>
      </Fade>
    </div>
  );
};
