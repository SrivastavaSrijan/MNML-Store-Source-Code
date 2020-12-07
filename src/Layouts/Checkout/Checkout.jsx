import React, { useState } from 'react';
import { CheckoutDetails } from '../../Components/Stripe/CheckoutDetails';
import { Title } from '../../Components/Title/Title';
import { Fade } from 'react-reveal';
import { StripeCore } from 'Components/Stripe/StripeCore';
import { StripeForm } from 'Components/Stripe/StripeForm';
import { useSelector } from 'react-redux';
import { SavedAddresses } from 'Components/Stripe/SavedAddresses';
const Checkout = () => {
  const [showCard, setShowCard] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [formValues, setValues] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const userSavedValues = currentUser ? currentUser.address : null;
  return (
    <div className="container is-fluid fit-desktop">
      <Fade duration={500}>
        <Title subtitle="Add your shipping and card details" title="Checkout.">
          {showCard ? (
            <StripeCore>
              <StripeForm formValues={formValues} setShowCard={setShowCard} />
            </StripeCore>
          ) : !showSaved ? (
            <CheckoutDetails
              setShowCard={setShowCard}
              setValues={setValues}
              userSavedValues={userSavedValues}
              setShowSaved={setShowSaved}
            />
          ) : (
            <SavedAddresses userSavedValues={userSavedValues} />
          )}
        </Title>
      </Fade>
    </div>
  );
};
export default Checkout;
