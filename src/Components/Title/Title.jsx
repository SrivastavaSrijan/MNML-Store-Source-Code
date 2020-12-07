import React from 'react';
export function Title({ title, subtitle, children }) {
  return (
    // <div className="px-6 py-6 is-muted-link">
    <article className="message is-link">
      <div className="message-header has-text-black py-3  ">
        <h2 className="subtitle is-size-5 is-size-6-mobile has-text-white is-italic">{subtitle}</h2>
      </div>
      <div className="message-body px-4 py-2">
        <h1 className="title is-size-2 is-size-3-mobile">{title}</h1>
      </div>
      {children || null}
    </article>
    // </div>
  );
}
