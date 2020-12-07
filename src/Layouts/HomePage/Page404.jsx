import React from 'react';
import { ArrowLeftCircle } from 'react-feather';
import { useHistory } from 'react-router-dom';
import Pulse from 'react-reveal/Pulse';
import { Image } from 'Components/Image/Image';
import NotFound from '../../Assets/Media/404.webp';
export const Page404 = ({ path }) => {
  const history = useHistory();
  return (
    <Pulse duration={500}>
      <div
        className="mt-2 box is-muted-danger has-text-centered is-hcentered is-vcentered is-flex"
        style={{ width: 'fit-content', margin: '0 auto', flexDirection: 'column' }}
      >
        <h1 className=" has-text-black is-size-4 is-size-5-mobile mb-3">
          We&rsquo;re sorry, the page you&rsquo;re looking for doesn&rsquo;t exist
        </h1>

        <Image
          alt="404"
          img={NotFound}
          is="256x256"
          className="has-text-centered"
          style={{ zIndex: 0, objectFit: 'cover' }}
        />
        <button
          className="button is-danger is-large is-fullwidth mt-3"
          onClick={() => {
            history.push(`/`);
          }}
        >
          <span className="icon is-small">
            <i>
              <ArrowLeftCircle size={20} />
            </i>
          </span>
          <span className="is-size-5 is-size-6-mobile">Go back home.</span>
        </button>
      </div>
    </Pulse>
  );
};
