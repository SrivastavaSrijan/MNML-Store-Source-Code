import React, { Component } from 'react';
import { AlertOctagon, RefreshCcw } from 'react-feather';
import Pulse from 'react-reveal/Pulse';
import { Image } from 'Components/Image/Image';
import Error from '../../Assets/Media/Error.webp';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
      generalInfo: null,
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    this.setState({ errorInfo: error, generalInfo: info });
  }
  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? <ErrorPage /> : children;
  }
}
const ErrorPage = ({ errorInfo, generalInfo }) => (
  <Pulse duration={500}>
    <div
      className="box mt-6
              is-muted-danger has-text-centered is-hcentered is-vcentered is-flex"
      style={{ width: 'fit-content', margin: '0 auto', flexDirection: 'column' }}
    >
      <h1 className="has-text-black is-size-4 is-size-5-mobile mb-3">
        {' '}
        We&rsquo;re sorry &mdash; Something&rsquo;s gone wrong.
      </h1>
      <Image
        alt="404"
        img={Error}
        is="256x256"
        className="has-text-centered"
        style={{ zIndex: 0, objectFit: 'cover' }}
      />
      <p className="has-text-black is-size-6 mt-3">
        Please send us an error report to solve this issue.
      </p>
      <div className="buttons has-text-centered is-hcentered mt-4">
        <button className="button is-danger is-medium">
          <span className="icon mt-1 is-small">
            <i>
              <AlertOctagon size={24} />
            </i>
          </span>
          <a
            className="is-size-6 is-size-7-mobile has-text-white"
            href={`mailto:srijan.srivastava35@gmail.com?subject=Error%20in%20MNML%20Store&body=${
              generalInfo ? generalInfo.componentStack.toString() : ''
            }`}
          >
            Send error report
          </a>
        </button>
        <button className="button is-link ml-4 is-medium">
          <span className="icon mt-1 is-small">
            <i>
              <RefreshCcw size={24} color="white" />
            </i>
          </span>
          <a
            className="is-size-6 is-size-7-mobile has-text-white"
            href="https://mnml.srijansrivastava.tech"
          >
            Go back
          </a>
        </button>
      </div>
    </div>
  </Pulse>
);
export default ErrorBoundary;
