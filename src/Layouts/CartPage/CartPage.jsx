import React from 'react';
import { CartComponent } from '../../Components/CartComponent/CartComponent';
import { CartFooter } from '../../Components/CartComponent/CartFooter';
import { Title } from '../../Components/Title/Title';
import { useSelector } from 'react-redux';
import { CartError } from './CartError';
import { CardError } from 'Layouts/CardList/CardError';

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isFetching } = useSelector((state) => state.general);
  return isFetching ? (
    <CardError />
  ) : cartItems && !Object.keys(cartItems).length ? (
    <>
      <Title title="Cart Empty" subtitle="It's lonely in here!" />
      <CartError />
    </>
  ) : (
    <div className="columns ">
      <div className="column is-5 ">
        <Title title="Cart." subtitle="Your items" />
        <CartFooter />
      </div>
      <div className="column  is-7 ">
        <CartComponent />
      </div>
    </div>
  );
};
export default CartPage;
