import React from 'react'
export const CircularProgressButtons = ({isLoading,onClickFunc,}) => {
  return(<button
  disabled={isLoading}
  className={`button is-success has-text-black ${isLoading ? `is-loading` : ``}`}
  onClick
>
  <span className="icon is-small">
    <i>
      <ShoppingCart size={20} />
    </i>
  </span>
  <span className="is-size-6 is-size-7-mobile">Add to cart</span>
</button>;)
}
